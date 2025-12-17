'use client';

import React from 'react';

export default function ChristmasLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-purple-900 p-8 relative overflow-hidden">
      {/* Falling Snowflakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-2xl opacity-70 christmas-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Christmas Tree Animation */}
        <div className="mb-8 christmas-bounce">
          <div className="text-6xl mb-2">🎄</div>
          <div className="text-4xl animate-pulse">✨</div>
        </div>

        {/* Spinning Ornament */}
        <div className="mb-6">
          <div className="text-5xl christmas-spin inline-block">🎁</div>
        </div>

        {/* Text */}
        <p className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          Analyzing your food...
        </p>
        <p className="text-lg text-white/80 drop-shadow">
          This may take a few seconds
        </p>

        {/* Twinkling Stars */}
        <div className="mt-8 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-2xl christmas-twinkle"
              style={{
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

