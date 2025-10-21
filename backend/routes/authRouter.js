import express from 'express'
import { googleLogin, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const UserRouter = express.Router();


UserRouter.get('/google',googleLogin)
UserRouter.patch("/updateProfile", authMiddleware, updateProfile);

export default UserRouter;