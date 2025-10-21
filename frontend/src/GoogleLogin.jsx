import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Utensils, Heart, Sparkles } from 'lucide-react';

export const GoogleLogin = () => {

  const navigate = useNavigate();

  const responseGoogle = async(authResults)=>{
    try{

      if(authResults['code']){
            
           const result = await googleAuth(authResults['code']);
           const { user, token } = result.data;

           localStorage.setItem('recipeToken', token);
           localStorage.setItem('recipeUser', JSON.stringify(user));

           if (!user.isProfileComplete) {
                navigate('/onboarding');
        } else {
                navigate('/dashboard');
        }

           
      }
         
    }catch(err)
    {
         console.error('Error while requesting google code', err);
    }
  }

  const  googleLogin  = useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow: 'auth-code'
  })

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-12 right-12 w-20 h-20 bg-red-100 rounded-full blur-2xl opacity-60"></div>

        <div className="max-w-md w-full z-10">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-900 to-red-700 rounded-3xl mb-6 shadow-lg transform hover:scale-105 transition-all duration-300">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-900 via-red-700 to-emerald-700 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to continue your culinary journey
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {[
              { icon: Utensils, text: "Personalized AI Recipes", color: "#B91C1C" },
              { icon: Heart, text: "Track Your Nutrition Goals", color: "#347433" },
              { icon: Sparkles, text: "Smart Meal Planning", color: "#FF6F3C" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 transform hover:scale-105 transition-all duration-200 hover:shadow-md"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full bg-white border-2 border-gray-200 hover:border-red-900 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="group-hover:text-red-900 transition-colors">Continue with Google</span>
          </button>

          {/* Privacy Note */}
          <p className="text-center text-sm text-gray-500 mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Right Side - Visual Content */}
      <div className="w-1/2 bg-gradient-to-br from-red-900 via-red-800 to-emerald-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-2xl">
              <ChefHat className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Your Healthy<br />AI Chef
          </h2>
          
          <p className="text-white/90 text-xl leading-relaxed max-w-md mx-auto">
            Get personalized recipes tailored to your dietary preferences, allergies, and nutritional goals
          </p>

          {/* Decorative Food Icons */}
          <div className="flex justify-center space-x-6 mt-12">
            {['🥗', '🍲', '🥘', '🍱'].map((emoji, idx) => (
              <div
                key={idx}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl transform hover:scale-110 transition-all duration-300 shadow-lg"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}