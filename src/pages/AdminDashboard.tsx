
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Pencil, FileText, MessageSquare, Database, Settings, LayoutDashboard, RefreshCw, Users, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/DataService';
import { Project, Resource, Review, UserDetails } from '../models/DataModels';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'userDetails'>('overview');
  
  useEffect(() => {
    // Redirect if not admin
    if (userRole !== 'admin') {
      toast.error('You do not have permission to access the admin dashboard');
      navigate('/');
      return;
    }
    
    // Load data
    setProjects(dataService.getAllProjects());
    setResources(dataService.getAllResources());
    setReviews(dataService.getAllReviews());
    setUserDetails(dataService.getAllUserDetails());
  }, [userRole, navigate]);
  
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      dataService.resetData();
      setProjects(dataService.getAllProjects());
      setResources(dataService.getAllResources());
      setReviews(dataService.getAllReviews());
      setUserDetails(dataService.getAllUserDetails());
      toast.success('All data has been reset to default values');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-neon-pink">
          Admin <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          Manage your content and review site statistics from this centralized dashboard.
        </p>

        {/* Dashboard Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 p-1 rounded-lg border border-white/10 flex">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'overview' 
                  ? 'bg-neon-blue/20 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('userDetails')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'userDetails' 
                  ? 'bg-neon-blue/20 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              User Database
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mx-auto mb-2 border border-neon-blue/50">
                  <Pencil className="w-6 h-6 text-neon-blue" />
                </div>
                <h3 className="font-bold text-2xl">{projects.length}</h3>
                <p className="text-gray-400">Projects</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mx-auto mb-2 border border-neon-pink/50">
                  <FileText className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="font-bold text-2xl">{resources.length}</h3>
                <p className="text-gray-400">Resources</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mx-auto mb-2 border border-neon-purple/50">
                  <MessageSquare className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="font-bold text-2xl">{reviews.length}</h3>
                <p className="text-gray-400">Reviews</p>
              </GlassCard>
              
              <GlassCard className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mx-auto mb-2 border border-white/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-2xl">{userDetails.length}</h3>
                <p className="text-gray-400">Users</p>
              </GlassCard>
            </div>

            {/* Admin Navigation Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <GlassCard 
                className="p-6 cursor-pointer transition-all hover:shadow-neon-blue"
                onClick={() => navigate('/projects')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-neon-blue/50">
                    <Pencil className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Manage Projects</h3>
                    <p className="text-gray-400">Add, edit, or remove projects</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard 
                className="p-6 cursor-pointer transition-all hover:shadow-neon-pink"
                onClick={() => navigate('/resources')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-neon-pink/50">
                    <FileText className="w-6 h-6 text-neon-pink" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Manage Resources</h3>
                    <p className="text-gray-400">Add, edit, or remove resources</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard 
                className="p-6 cursor-pointer transition-all hover:shadow-neon-purple"
                onClick={() => navigate('/reviews')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-neon-purple/50">
                    <MessageSquare className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Manage Reviews</h3>
                    <p className="text-gray-400">View and moderate reviews</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Recent Items Section */}
            <GlassCard className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-2 text-neon-blue" />
                Recent Activity
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Title</th>
                      <th className="text-left py-2 px-4">Category</th>
                      <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ...reviews.slice(0, 2).map(review => ({ type: 'Review', title: review.name, category: 'Feedback', id: review.id })),
                      ...projects.slice(0, 2).map(project => ({ type: 'Project', title: project.title, category: project.category, id: project.id })),
                      ...resources.slice(0, 2).map(resource => ({ type: 'Resource', title: resource.title, category: resource.category, id: resource.id }))
                    ]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .map((item, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-black/20">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.type === 'Review' ? 'bg-neon-purple/20 text-neon-purple' :
                            item.type === 'Project' ? 'bg-neon-blue/20 text-neon-blue' :
                            'bg-neon-pink/20 text-neon-pink'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">{item.title}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">
                          <GlowingButton 
                            className="text-xs py-1 px-3"
                            color={
                              item.type === 'Review' ? 'purple' :
                              item.type === 'Project' ? 'cyan' : 'pink'
                            }
                            onClick={() => {
                              if (item.type === 'Review') navigate('/reviews');
                              else if (item.type === 'Project') navigate('/projects');
                              else navigate('/resources');
                            }}
                          >
                            View
                          </GlowingButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            {/* Admin Settings Section */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-white" />
                Admin Settings
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <h3 className="font-semibold mb-2">Data Management</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Reset all data to its initial values. This is useful for testing or if you want to start fresh.
                    <br />
                    <span className="text-red-400">Warning: This action cannot be undone.</span>
                  </p>
                  <GlowingButton onClick={handleResetData} className="text-sm flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default Data
                  </GlowingButton>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Admin Status</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    You are currently in admin mode. You can edit all content and access admin-only features.
                  </p>
                  <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-md p-4 text-sm">
                    <p className="mb-2">
                      <strong>Note:</strong> In a production environment, this would be secured with proper authentication 
                      and authorization. Currently, any user can toggle between user and admin mode for demonstration purposes.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </>
        ) : (
          // User Database Section
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Database className="w-5 h-5 mr-2 text-neon-blue" />
              User Database
            </h2>
            
            {userDetails.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-4">ID</th>
                      <th className="text-left py-2 px-4">Name</th>
                      <th className="text-left py-2 px-4">Email</th>
                      <th className="text-left py-2 px-4">Visit Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.map((user, index) => (
                      <tr key={user.id} className={`border-b border-white/5 hover:bg-black/20 ${index % 2 === 0 ? 'bg-black/10' : ''}`}>
                        <td className="py-3 px-4 font-mono text-xs text-gray-400">{user.id.substring(0, 8)}...</td>
                        <td className="py-3 px-4 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-neon-blue" />
                          {user.name}
                        </td>
                        <td className="py-3 px-4">
                          {user.email ? (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-neon-pink" />
                              {user.email}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">Not provided</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-neon-purple" />
                            {new Date(user.visitDate).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No user data available.</p>
              </div>
            )}
          </GlassCard>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
