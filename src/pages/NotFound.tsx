
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import GlowingButton from '../components/GlowingButton';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-black/60 flex items-center justify-center border border-neon-blue/70 shadow-neon-glow animate-pulse-glow">
              <AlertCircle className="w-12 h-12 text-neon-blue" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
          <p className="text-2xl text-white mb-6">Lost in the Cosmic Void</p>
          <p className="text-gray-300 mb-8">
            The star system you're looking for doesn't seem to exist in this galaxy. 
            Let's navigate back to familiar territory.
          </p>
          
          <GlowingButton>
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Home Base
            </Link>
          </GlowingButton>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
