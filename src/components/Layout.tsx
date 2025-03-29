
import React from 'react';
import NavBar from './NavBar';
import CosmicBackground from './CosmicBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CosmicBackground />
      <NavBar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
