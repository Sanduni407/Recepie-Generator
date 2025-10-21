import React from 'react';
import { ArrowRight } from 'lucide-react';
import chef from '../assets/chef.jpg'
import plate from '../assets/plate.png'

const HeroSection = () => {
  return (
    <div className="min-h-screen flex relative">
      {/* Left Side - White Background */}
      <div className="w-3/5 bg-white flex flex-col justify-start items-start p-12 relative z-10">
        {/* Cartoon Chef Image */}
        <img
          src={chef}
          alt="Cartoon Chef"
          className="w-64 mb-6"
        />

        {/* Header */}
        <h1 className="text-5xl lg:text-6xl font-bold mb-14 leading-tight bg-gradient-to-r from-black via-red-900 to-black bg-clip-text text-transparent">
          Your Healthy AI Chef
        </h1>

        {/* Subheading Paragraph */}
        <p className="text-gray-800 text-lg lg:text-xl mb-10 mr-20  leading-relaxed font-bold">
           Our AI chef analyzes your dietary preferences, food allergies, and nutritional goals to create perfectly balanced, delicious recipes just for you.
        </p>

        {/* Call to Action Button */}
        <button className="inline-flex items-center bg-red-900 hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md">
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {/* Right Side - Olive Green Background */}
      <div className="w-2/5 relative flex items-center justify-center p-8 bg-red-900">
        {/* Main Large Image */}
        <img
          src={plate}
          alt="Fresh vegetable salad bowl"
          className="absolute -left-24 top-1/2 transform -translate-y-1/2 w-[600px] max-w-none object-contain z-20"
        />

        {/* Subtle Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute top-0 left-0 w-20 h-20 rounded-full blur-2xl" style={{backgroundColor: '#6B7C32'}}></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl" style={{backgroundColor: '#9CAF88'}}></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;