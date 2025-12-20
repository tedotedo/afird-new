'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number; // milliseconds
}

export default function Confetti({ show, onComplete, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const confettiEmojis = ['🎉', '⭐', '🌟', '✨', '🎊', '🎈', '💫', '🌈', '🏆', '👏'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 1,
      }));
      setParticles(newParticles);

      // Clear confetti after duration
      const timeout = setTimeout(() => {
        setParticles([]);
        if (onComplete) {
          onComplete();
        }
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      setParticles([]);
    }
  }, [show, duration, onComplete]);

  if (!show || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            top: '-50px',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${20 + Math.random() * 20}px`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
      
      {/* Celebration message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-scaleIn">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-2xl">
          <div className="text-6xl mb-2">🌟</div>
          <h2 className="text-3xl font-bold mb-2">Amazing!</h2>
          <p className="text-lg">New food milestone achieved!</p>
        </div>
      </div>
    </div>
  );
}

