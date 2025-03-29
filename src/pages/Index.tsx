
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlowingButton from '../components/GlowingButton';
import DynamicQuote from '../components/DynamicQuote';
import { ArrowRight, Star, Globe, Sparkles } from 'lucide-react';

const Index = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (mouseX - centerX) / centerX * 10;
      const deltaY = (mouseY - centerY) / centerY * 10;
      
      orbitRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Layout>
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Orbit elements */}
        <div ref={orbitRef} className="absolute inset-0 pointer-events-none">
          <div className="circle-orbit w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="circle-orbit w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{animationDuration: '25s'}}></div>
          <div className="circle-orbit w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{animationDuration: '35s'}}></div>
          
          <div className="planet-element w-16 h-16 top-1/3 left-1/4 animate-float"></div>
          <div className="planet-element w-12 h-12 bottom-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="planet-element w-20 h-20 top-1/4 right-1/3 animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Central UI */}
        <div className="text-center z-10 max-w-3xl">
          <div className="mb-4 flex justify-center">
            <Star className="text-neon-blue animate-star-pulse h-8 w-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="neon-text">Welcome to</span><br />
            <span className="text-white">the Cosmic Dreamscape</span>
          </h1>
          
          <DynamicQuote />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <GlowingButton color="cyan">
              <Link to="/projects" className="flex items-center">
                <span>Explore Projects</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GlowingButton>
            <GlowingButton color="purple">
              <Link to="/resources" className="flex items-center">
                <span>Discover Resources</span>
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </GlowingButton>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <ArrowRight className="transform rotate-90 text-white opacity-70" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 neon-border">
              <Globe className="text-neon-blue h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Digital Cosmos</h3>
            <p className="text-gray-300">Navigate through the digital universe of innovative projects and technological marvels.</p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 neon-border-pink">
              <Star className="text-neon-pink h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Creative Exploration</h3>
            <p className="text-gray-300">Explore the intersection of creativity and technology through cosmic design principles.</p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 neon-border-purple">
              <Sparkles className="text-neon-purple h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Future Vision</h3>
            <p className="text-gray-300">Glimpse into tomorrow's technological landscape through innovative concepts and projects.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
