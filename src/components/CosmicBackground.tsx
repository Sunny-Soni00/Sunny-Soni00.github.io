
import React, { useEffect, useRef } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create stars
    const stars: Array<{x: number, y: number, radius: number, opacity: number, speed: number}> = [];
    const createStars = () => {
      stars.length = 0; // Clear any existing stars
      const numberOfStars = Math.floor(canvas.width * canvas.height / 5000);
      
      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.02
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move stars slightly for subtle animation
        star.opacity = Math.sin(Date.now() * star.speed) * 0.5 + 0.5;
      });
      
      requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasDimensions();
    createStars();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      setCanvasDimensions();
      createStars();
    });

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default CosmicBackground;
