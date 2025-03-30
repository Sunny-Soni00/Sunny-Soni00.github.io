
import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { 
  Clock, MessageSquare, Heart, Eye, LogIn, 
  Star, ChevronDown, ChevronUp 
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { UserActivity } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';

const RecentActivity = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [expanded, setExpanded] = useState(false);
  const { userDetails } = useAuth();
  
  useEffect(() => {
    if (userDetails?.id) {
      const userActivities = dataService.getUserActivity(userDetails.id);
      // Sort by timestamp descending
      const sortedActivities = [...userActivities].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setActivities(sortedActivities);
    } else {
      setActivities([]);
    }
  }, [userDetails]);
  
  const formatTimestamp = (timestamp: string) => {
    try {
      const now = new Date();
      const activityTime = new Date(timestamp);
      const diffMs = now.getTime() - activityTime.getTime();
      
      // Convert to appropriate time unit
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffSecs < 60) return 'just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      
      // Return formatted date for older activities
      return activityTime.toLocaleDateString();
    } catch (e) {
      return 'unknown time';
    }
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="w-4 h-4 text-neon-blue" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-neon-purple" />;
      case 'like':
        return <Heart className="w-4 h-4 text-neon-pink" />;
      case 'review':
        return <Star className="w-4 h-4 text-neon-blue" />;
      case 'view':
        return <Eye className="w-4 h-4 text-neon-blue" />;
      default:
        return <Clock className="w-4 h-4 text-neon-blue" />;
    }
  };
  
  const displayActivities = expanded ? activities : activities.slice(0, 5);
  const hasMoreActivities = activities.length > 5;
  
  if (!userDetails) {
    return (
      <GlassCard className="p-4">
        <div className="text-center p-4 text-gray-400">
          <Clock className="w-6 h-6 mx-auto mb-2 opacity-50" />
          <p>Sign in to see your activity</p>
        </div>
      </GlassCard>
    );
  }
  
  if (activities.length === 0) {
    return (
      <GlassCard className="p-4">
        <div className="flex items-center mb-3">
          <Clock className="w-4 h-4 mr-2" />
          <h3 className="font-bold">Recent Activity</h3>
        </div>
        <div className="text-center p-4 text-gray-400">
          <p>No activity yet</p>
        </div>
      </GlassCard>
    );
  }
  
  return (
    <GlassCard className="p-4">
      <div className="flex items-center mb-3">
        <Clock className="w-4 h-4 mr-2" />
        <h3 className="font-bold">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="bg-black/30 rounded-lg p-3 flex items-start">
            <div className="p-2 bg-black/50 rounded-full mr-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm">{activity.details}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTimestamp(activity.timestamp)}</p>
            </div>
          </div>
        ))}
        
        {hasMoreActivities && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors py-2 flex items-center justify-center"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" /> Show More ({activities.length - 5} more)
              </>
            )}
          </button>
        )}
      </div>
    </GlassCard>
  );
};

export default RecentActivity;
