import React from 'react';
import { useEffect, useState } from 'react';

interface FishProps {
  id: number;
  color: string;
  initialX: number;
  initialY: number;
}

export default function Fish({ id, color, initialX, initialY }: FishProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const swim = () => {
      setPosition((prev) => {
        const newX = prev.x + direction * 2;
        const newY = prev.y + Math.sin(Date.now() / 1000) * 0.5;

        // Change direction when hitting boundaries
        if (newX > window.innerWidth - 100) {
          setDirection(-1);
          return { x: window.innerWidth - 100, y: newY };
        } else if (newX < 0) {
          setDirection(1);
          return { x: 0, y: newY };
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(swim, 50);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="absolute transition-transform duration-300"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${direction})`,
      }}
    >
      <svg
        width="200"
        height="30"
        viewBox="0 0 50 30"
        className="transition-colors duration-300"
        transform="scale(-1, 1) translate(-50, 0)"
      >
        <path
          d="M45 15C45 15 35 5 20 5C10 5 5 10 5 15C5 20 10 25 20 25C35 25 45 15 45 15Z"
          fill={color}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2"
        />
        <circle cx="10" cy="15" r="2" fill="black" />
        <path
          d="M45 15L50 10V20L45 15Z"
          fill="yellow"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
