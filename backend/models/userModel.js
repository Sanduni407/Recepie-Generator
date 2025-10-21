import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    dietType: {
      type: String, 
      default: "none",
    },
    allergies: [
      {
        type: String, 
      },
    ],
    caloriesPerMeal: {
      type: Number,
      default: 0,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    }, 
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User =  mongoose.model("User", userSchema);
export default User;
