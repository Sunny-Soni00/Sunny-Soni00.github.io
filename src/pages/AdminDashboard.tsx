
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  Users, Database, Settings, ChevronRight, DownloadCloud, 
  Activity, FileText, RefreshCcw, Clock, Download 
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { UserDetails, DatabaseLogEntry } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// Tabs definition
type AdminTab = 'users' | 'logs' | 'settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [userList, setUserList] = useState<UserDetails[]>([]);
  const [logsData, setLogsData] = useState<DatabaseLogEntry[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      toast.error('You must be logged in as admin to access this page');
      navigate('/');
      return;
    }
    
    // Load data
    loadData();
  }, [isAuthenticated, userRole, navigate]);
  
  const loadData = () => {
    setUserList(dataService.getAllUserDetails());
    setLogsData(dataService.getDatabaseLogs());
  };
  
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      dataService.resetData();
      toast.success('All data has been reset to defaults');
      loadData();
    }
  };
  
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (e) {
      return timestamp;
    }
  };
  
  const handleDownloadUserData = () => {
    dataService.downloadUserData();
    toast.success('User data downloaded successfully');
  };
  
  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Database</h2>
              <GlowingButton onClick={handleDownloadUserData} className="text-sm flex items-center">
                <Download className="w-4 h-4 mr-1" />
                Download User Data
              </GlowingButton>
            </div>
            
            {userList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/10">
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Join Date</th>
                      <th className="px-4 py-3 text-left">Activities</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map(user => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-black/20">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center mr-2 border border-white/20">
                              {user.profilePicture ? (
                                <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                              ) : (
                                user.name.charAt(0)
                              )}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.visitDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 mr-1 text-neon-blue" />
                            <span>{user.activity?.length || 0}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button 
                            className="text-neon-blue hover:text-neon-purple transition-colors"
                            onClick={() => {
                              // View user details functionality could be added here
                              toast.info(`Viewing details for ${user.name}`);
                            }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No users registered yet</p>
              </div>
            )}
          </div>
        );
        
      case 'logs':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Database Logs</h2>
            
            {logsData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/10">
                      <th className="px-4 py-3 text-left">Timestamp</th>
                      <th className="px-4 py-3 text-left">Action</th>
                      <th className="px-4 py-3 text-left">Entity</th>
                      <th className="px-4 py-3 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logsData.map(log => (
                      <tr key={log.id} className="border-b border-white/5 hover:bg-black/20">
                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                        <td className="px-4 py-3">
                          <span className={`
                            px-2 py-0.5 rounded-full text-xs
                            ${log.action === 'create' ? 'bg-green-500/20 text-green-300' : 
                              log.action === 'update' ? 'bg-blue-500/20 text-blue-300' : 
                              'bg-red-500/20 text-red-300'}
                          `}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-black/40 rounded-full text-xs">
                            {log.entity}
                          </span>
                        </td>
                        <td className="px-4 py-3">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No logs recorded yet</p>
              </div>
            )}
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Settings</h2>
            
            <div className="space-y-6">
              <GlassCard className="p-4">
                <h3 className="font-bold mb-2">Database Management</h3>
                <p className="text-gray-400 mb-3 text-sm">Reset the application data to default values. Warning: This cannot be undone.</p>
                <GlowingButton color="pink" onClick={handleResetData} className="text-sm flex items-center">
                  <RefreshCcw className="w-4 h-4 mr-1" />
                  Reset to Defaults
                </GlowingButton>
              </GlassCard>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Admin <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Manage all aspects of your cosmic application from this central hub.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <GlassCard className="p-4">
              <h2 className="font-bold mb-4">Dashboard</h2>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'users' ? 'bg-black/40 text-white' : 'hover:bg-black/20 text-gray-300'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <span>User Database</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('logs')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'logs' ? 'bg-black/40 text-white' : 'hover:bg-black/20 text-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Database Logs</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                    activeTab === 'settings' ? 'bg-black/40 text-white' : 'hover:bg-black/20 text-gray-300'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </button>
              </nav>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between px-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Database className="w-4 h-4 mr-1" />
                    <span>Users</span>
                  </div>
                  <span>{userList.length}</span>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <GlassCard className="p-6">
              {renderTabContent()}
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
