import client from "../utils/openaiClient.js";
import User from "../models/userModel.js";

export const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ success: false, message: "Ingredients are required" });
    }

    // Get user info from token
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { dietType, allergies, caloriesPerMeal } = user;

    // Build AI prompt
    const prompt = `
You are a professional nutritionist chef AI. 
User has the following ingredients: ${ingredients.join(", ")}.
Dietary preference: ${dietType}.
Calorie goal: ${caloriesPerMeal}.
Allergies: ${allergies.join(", ")}.

Provide exactly 1 healthy recipe in JSON format with the following structure:

{
  "title": "Recipe Name",
  "ingredients": [
    {"name": "ingredient1", "quantity": "100g"},
    {"name": "ingredient2", "quantity": "2 cups"}
  ],
  "instructions": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "calories_per_serving": 350
}

Return **only valid JSON** with no backticks, no markdown, no extra text.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional nutritionist chef AI." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    // Parse AI JSON safely
    let recipeData;
    try {
      let content = response.choices[0].message.content;

      // Remove backticks if AI still adds them (extra safety)
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();

      recipeData = JSON.parse(content);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return res.status(500).json({ success: false, message: "AI returned invalid JSON" });
    }

    res.json({ success: true, recipe: recipeData });

  } catch (err) {
    console.error("Error generating recipe:", err);
    res.status(500).json({ success: false, message: "Failed to generate recipe" });
  }
};
