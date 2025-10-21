import { oauth2Client } from '../utils/googleConfig.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }


    console.log("Received code:", code);


   
    let tokenResponse;
    try {
      tokenResponse = await oauth2Client.getToken(code);
    } catch (err) {
      console.error('Error getting tokens:', err.response?.data || err.message);
      return res.status(500).json({ error: 'Failed to exchange code for tokens' });
    }

    const { tokens } = tokenResponse;
    oauth2Client.setCredentials(tokens);

  
    let userInfo;
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        { headers: { Authorization: `Bearer ${tokens.access_token}` } }
      );
      userInfo = response.data;
    } catch (err) {
      console.error('Error getting user info:', err.response?.data || err.message);
      return res.status(500).json({ error: 'Failed to fetch user info from Google' });
    }

    const { email, name, id: googleId, picture: image } = userInfo;

   
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ googleId, email, name, image });
    }

   
    const token = jwt.sign(
      { _id: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMEOUT || '12h' }
    );

   
    return res.status(200).json({ user, token });

  } catch (err) {
    console.error('Unexpected server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { dietType, allergies, caloriesPerMeal } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        dietType,
        allergies,
        caloriesPerMeal,
        isProfileComplete: true,
      },
      { new: true } 
    );

    res.json({success:true, message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};