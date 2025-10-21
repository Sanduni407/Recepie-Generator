import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { generateRecipe } from "../controllers/recipeController.js";

const Reciperouter = express.Router();

// POST /recipes/generate
Reciperouter.post("/generate", authMiddleware, generateRecipe);

export default Reciperouter;
