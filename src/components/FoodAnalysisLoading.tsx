'use client';

import React from 'react';

const FOOD_EMOJIS = ['🥕', '🍎', '🥦', '🍇', '🥑', '🍊', '🍓', '🌽'];

export default function FoodAnalysisLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 relative overflow-hidden">
      {/* Floating Food Items */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FOOD_EMOJIS.map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl food-float"
            style={{
              left: `${10 + (i * 12)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Analyzing Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Plate */}
            <div className="text-7xl food-pulse">🍽️</div>
            {/* Magnifying glass orbiting */}
            <div className="absolute inset-0 food-orbit">
              <span className="text-4xl absolute -top-2 -right-2">🔍</span>
            </div>
          </div>
        </div>

        {/* Sparkles */}
        <div className="mb-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="text-3xl food-sparkle"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              ✨
            </span>
          ))}
        </div>

        {/* Text */}
        <p className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          Analyzing your food...
        </p>
        <p className="text-lg text-white/90 drop-shadow">
          Calculating nutrition info
        </p>

        {/* Progress dots */}
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full food-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
