# 🍳 Smart Recipe Generator App

**Smart Recipe Generator** is an intelligent web application built using the **MERN stack** that helps users discover personalized recipes based on their dietary preferences, calorie goals, and available ingredients.  
It uses **Google Authentication** for secure login and integrates the **OpenAI ChatGPT API** to generate creative, healthy, and delicious recipe suggestions.

---

## ✨ Key Features

- 🔐 **Google Authentication** – Seamless and secure sign-in using Google OAuth.  
- 🍽️ **Personalized Onboarding** – Users set their dietary preferences, calorie targets, and allergies during their first login.  
- 🧠 **AI-Powered Recipe Generation** – Generates recipes using OpenAI’s ChatGPT API based on the user’s input ingredients.  
- ⚙️ **Smart Filtering** – Recipes are matched to the user's selected diet and calorie range.  
- 💾 **User Data Storage** – Preferences and history are securely stored in the database for a personalized experience.  
- 🧾 **Interactive Interface** – Simple and modern UI for easy ingredient entry and recipe display.

---

## 🧩 Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** Google OAuth 2.0  
- **AI Integration:** OpenAI ChatGPT API  
- **Hosting (optional):** Render / Vercel / Netlify  

---

## 🚀 How It Works

1. User logs in with **Google Authentication**.  
2. On first login, the onboarding form collects:
   - Dietary preference (e.g., Vegan, Keto, High Protein)
   - Daily calorie goal
   - Food allergies (optional)  
3. User enters the ingredients they currently have.  
4. The app sends the data to **OpenAI’s ChatGPT API** to generate recipe ideas matching preferences and calorie limits.  
5. The user can view detailed recipes, ingredients, and preparation steps.

---

## 🧠 Example Use Case

> 🧍‍♀️ A user who follows a **vegetarian** diet and has a **nut allergy** enters:  
> “tomato, pasta, spinach”  
>  
> The app generates:  
> “Creamy Spinach Tomato Pasta — 450 kcal”  
> Along with the ingredients, cooking steps, and nutritional breakdown.

