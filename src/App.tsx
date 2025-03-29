
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Index';
import About from './pages/About';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import Reviews from './pages/Reviews';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';

import './App.css';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { showUserLogin, isAuthenticated, userRole } = useAuth();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* User Login Modal */}
      {showUserLogin && <UserLogin />}
      
      {/* Admin Login Modal */}
      {userRole === 'admin' && !isAuthenticated && window.location.pathname === "/admin" && (
        <AdminLogin />
      )}
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
