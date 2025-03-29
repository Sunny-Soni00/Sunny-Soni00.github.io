
import React, { useState, useEffect } from 'react';

const quotes = [
  "Navigating the digital cosmos one pixel at a time.",
  "Where imagination meets technology in infinite space.",
  "Building bridges across the digital universe.",
  "Every line of code creates a star in my digital galaxy.",
  "Connecting dots in the vast expanse of the tech universe."
];

const DynamicQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(newQuote);
        setIsChanging(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-3 px-5 my-6 glass-card max-w-md mx-auto">
      <p 
        className={`text-lg text-center italic transition-opacity duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
      >
        "{currentQuote}"
      </p>
    </div>
  );
};

export default DynamicQuote;
