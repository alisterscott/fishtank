import React, { useState, useEffect } from 'react';
import Fish from './Fish';

interface FishData {
  id: number;
  color: string;
  x: number;
  y: number;
}

export default function FishTank() {
  const [fishes, setFishes] = useState<FishData[]>([]);

  useEffect(() => {
    // Initialize fish with random positions
    const initialFishes = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      color: '#00a0dc',
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    }));
    setFishes(initialFishes);

    // Set up WebSocket or polling for API updates
    const checkUpdates = setInterval(() => {
      fetch('/api/fish-colors').catch((err) =>
        console.log('API not available:', err)
      );
    }, 1000);

    return () => clearInterval(checkUpdates);
  }, []);

  // Simulate API endpoint (replace with actual backend implementation)
  useEffect(() => {
    window.updateFishColor = (id: number, color: string) => {
      setFishes((prev) =>
        prev.map((fish) => (fish.id === id ? { ...fish, color } : fish))
      );
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-300 to-blue-600 overflow-hidden">
      {/* Bubbles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-white animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Plants */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-16 h-32 animate-sway"
            style={{
              left: `${i * 15 + Math.random() * 5}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <div className="w-full h-full bg-green-700 rounded-t-full transform origin-bottom" />
          </div>
        ))}
      </div>

      {/* Fish */}
      {fishes.map((fish) => (
        <Fish
          key={fish.id}
          id={fish.id}
          color={fish.color}
          initialX={fish.x}
          initialY={fish.y}
        />
      ))}
    </div>
  );
}
