// components/Counter.tsx
"use client"; // Mark this as a Client Component

import { useEffect, useState } from 'react';

interface CounterProps {
    target: number; // Target number for the counter
    duration?: number; // Duration of the animation in milliseconds
    className?: string; // Additional Tailwind classes
}

const Counter = ({ target, duration = 2000, className }: CounterProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [target, duration]);

    return (
        <span className={`text-4xl text-white ${className}`}>
      {count}
    </span>
    );
};

export default Counter;