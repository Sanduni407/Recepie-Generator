import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Navigation from "./Navigation";
import template from '../assets/template.png';

const RecipeGenerator = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const redColor = "#B91C1C"; // Red theme

  // Add ingredient as chip
  const handleAddIngredient = (e) => {
    if (e.key === "Enter" && ingredientInput.trim() !== "") {
      if (!ingredients.includes(ingredientInput.trim())) {
        setIngredients([...ingredients, ingredientInput.trim()]);
      }
      setIngredientInput("");
    }
  };

  // Remove ingredient chip
  const handleRemoveIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  // Call backend API to generate recipe
  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient!");
      return;
    }

    setLoading(true);
    setRecipe(null);

    const token = localStorage.getItem("recipeToken");

    try {
      const response = await axios.post(
        "http://localhost:8080/recipes/generate",
        { ingredients },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setRecipe(response.data.recipe);
      } else {
        alert("Failed to generate recipe!");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />

      <div className="max-w-3xl mx-auto p-6 ">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Ingredients</h2>

        {/* Input for ingredients */}
       {/* Input for ingredients */}
<div className="mb-4">
  <input
    type="text"
    value={ingredientInput}
    onChange={(e) => setIngredientInput(e.target.value)}
    onKeyDown={handleAddIngredient}
    placeholder="Type ingredient and press Enter"
    className="w-full border-2 border-gray-300 rounded-e-md rounded-l-md px-4 py-2 focus:outline-none focus:border-r-emerald-700"
  />

  {/* Chips displayed below input */}
  {ingredients.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-2">
      {ingredients.map((item) => (
        <div
          key={item}
          className="flex items-center px-3 py-1 rounded-full text-sm bg-emerald-200 text-emerald-800"
        >
          {item}
          <button
            onClick={() => handleRemoveIngredient(item)}
            className="ml-2 hover:text-red-900"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )}
</div>

        <button
          onClick={handleGenerateRecipe}
          className="bg-red-900 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold mb-6 transition-all"
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        {/* Recipe Display */}
       {recipe && (
  <div
    className="relative bg-cover bg-center rounded-lg shadow-md p-6"
    style={{ backgroundImage: `url(${template})` }}
  >
    {/* Overlay */}
    <div className="bg-white/70 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2 text-red-700">{recipe.title}</h3>

      <p className="text-gray-600 mb-4">
        Approx Calories: <span className="font-semibold text-red-700">{recipe.calories_per_serving}</span>
      </p>

      <h4 className="font-semibold mb-1 text-red-700">Ingredients:</h4>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing.quantity} {ing.name}</li>
        ))}
      </ul>

      <h4 className="font-semibold mb-1 text-red-700">Instructions:</h4>
      <ol className="list-decimal list-inside">
        {recipe.instructions.map((step, idx) => (
          <li key={idx} className="mb-2">{step}</li>
        ))}
      </ol>
    </div>
  </div>
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;
