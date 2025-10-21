import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Utensils, AlertTriangle, Target } from "lucide-react";
import onboradone from '../assets/onboard.png'
import { useNavigate } from "react-router-dom";

const Onboard = () => {
   
    const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [dietType, setDietType] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [calories, setCalories] = useState("");

  const dietOptions = [
    { 
      value: "vegetarian", 
      label: "Vegetarian", 
      icon: "🥗", 
      desc: "Plant-based with dairy and eggs",
      color: "#347433",
      lightColor: "#347433"
    },
    { 
      value: "vegan", 
      label: "Vegan", 
      icon: "🌱", 
      desc: "Fully plant-based lifestyle",
      color: "#FFC107",
      lightColor: "#FFC107"
    },
    { 
      value: "pescatarian", 
      label: "Pescatarian", 
      icon: "🐟", 
      desc: "Vegetarian plus fish and seafood",
      color: "#FF6F3C",
      lightColor: "#FF6F3C"
    },
    { 
      value: "non-vegetarian", 
      label: "Non-Vegetarian", 
      icon: "🍖", 
      desc: "Includes all food types",
      color: "#B22222",
      lightColor: "#B22222"
    }
  ];

  const steps = [
    {
      title: "Choose Your Diet",
      subtitle: "What type of diet do you follow?",
      icon: <Utensils className="w-8 h-8" />,
      image: 'https://images.immediate.co.uk/production/volatile/sites/2/2023/01/Turmeric-fried-eggs-and-kale-salad-ac3c50c.jpg?quality=90&resize=708,643',
      primaryColor: "#347433",
      secondaryColor: "#FFC107"
    },
    {
      title: "Food Allergies",
      subtitle: "Let us know about any allergies you have",
      icon: <AlertTriangle className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      primaryColor: "#FF6F3C",
      secondaryColor: "#FFC107"
    },
    {
      title: "Calorie Goals",
      subtitle: "How many calories per meal?",
      icon: <Target className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      primaryColor: "#B22222",
      secondaryColor: "#347433"
    }
  ];

  const allergyColors = [
    { bg: "#347433", text: "white" },
    { bg: "#FFC107", text: "black" },
    { bg: "#FF6F3C", text: "white" },
    { bg: "#B22222", text: "white" }
  ];

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (item) => {
    setAllergies(allergies.filter((a) => a !== item));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("recipeToken");
    
    try {
      const response = await fetch("http://localhost:8080/auth/updateProfile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          dietType,
          allergies,
          caloriesPerMeal: Number(calories)
        })
      });

      const data = await response.json();
      console.log("Profile updated:", data);

      if (data.success) {
        alert("Profile updated successfully! Redirecting to dashboard...");
      }

      navigate('/dashboard')
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile. Please try again.");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return dietType !== "";
      case 1: return true;
      case 2: return calories !== "";
      default: return false;
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Centered Square Image */}
      <div className="w-1/2 relative flex items-center justify-center bg-white">
        {/* Progress Steps */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex space-x-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  index <= currentStep 
                    ? 'shadow-lg scale-110' 
                    : 'bg-gray-200'
                }`}
                style={{
                  backgroundColor: index <= currentStep ? step.primaryColor : undefined
                }}
              />
            ))}
          </div>
        </div>

        {/* Step Counter */}
        <div className="absolute bottom-8 left-8 z-10">
          <div 
            className="text-sm font-bold px-4 py-2 rounded-full text-white shadow-lg"
            style={{ backgroundColor: currentStepData.primaryColor }}
          >
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Centered Square Image Container - NO BORDERS */}
        <div className="w-4/5 h-4/5 rounded-3xl shadow-2xl overflow-hidden">
          <img 
            src={steps[currentStep].image} 
            alt={steps[currentStep].title}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-1/2 p-12 flex flex-col justify-center relative bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-white shadow-lg transition-all duration-500"
              style={{ backgroundColor: currentStepData.primaryColor }}
            >
              {steps[currentStep].icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600 text-lg">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-3">
                {dietOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDietType(option.value)}
                    className={`w-full p-4 rounded-xl transition-all duration-200 text-left transform hover:scale-105 ${
                      dietType === option.value
                        ? 'shadow-lg scale-105'
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: dietType === option.value ? `${option.color}15` : undefined
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-md"
                        style={{ backgroundColor: option.color }}
                      >
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </div>
                      {dietType === option.value && (
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: option.color }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type allergy and press Enter"
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                    style={{ 
                      backgroundColor: allergyInput ? `${currentStepData.primaryColor}15` : undefined 
                    }}
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddAllergy(e);
                    }}
                  />
                </div>
                
                {allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((item, index) => {
                      const colorScheme = allergyColors[index % allergyColors.length];
                      return (
                        <div
                          key={item}
                          className="flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105 shadow-sm"
                          style={{ 
                            backgroundColor: colorScheme.bg, 
                            color: colorScheme.text 
                          }}
                        >
                          {item}
                          <button
                            className="ml-2 hover:scale-125 transition-transform font-bold text-lg leading-none opacity-80 hover:opacity-100"
                            onClick={() => handleRemoveAllergy(item)}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <p className="text-sm text-gray-500 italic">
                  Don't worry, you can skip this step if you don't have any allergies
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 focus:outline-none transition-colors text-center text-2xl font-semibold"
                    style={{ 
                      backgroundColor: calories ? `${currentStepData.primaryColor}15` : undefined 
                    }}
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                  <div className="text-center mt-2 text-sm text-gray-500">
                    calories per meal
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[
                    { cal: 300, color: "#22c55e" },
                    { cal: 500, color: "#dc2626" },
                    { cal: 700, color: "#16a34a" }
                  ].map(({ cal, color }) => (
                    <button
                      key={cal}
                      onClick={() => setCalories(cal.toString())}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${
                        calories === cal.toString()
                          ? 'text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: calories === cal.toString() ? color : undefined
                      }}
                    >
                      {cal}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all transform ${
                canProceed()
                  ? 'text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{
                backgroundColor: canProceed() ? currentStepData.primaryColor : undefined
              }}
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Skip Option for Allergies */}
          {currentStep === 1 && (
            <div className="text-center mt-4">
              <button
                onClick={handleNext}
                className="text-sm hover:underline transition-colors"
                style={{ color: currentStepData.primaryColor }}
              >
                Skip this step
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboard;