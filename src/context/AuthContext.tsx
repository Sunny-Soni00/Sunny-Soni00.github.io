import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AdminCredentials, UserDetails, UserActivity, Comment } from '../models/DataModels';
import { dataService } from '../services/DataService';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import GlowingButton from '../components/GlowingButton';

type UserRole = 'user' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: (details: Omit<UserDetails, 'id'>) => void;
  showUserLogin: boolean;
  setShowUserLogin: (show: boolean) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  toggleRole: () => void;
  updateProfilePicture: (imageUrl: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes'>, anonymous?: boolean) => Comment | undefined;
  updateComment: (commentId: string, text: string) => Comment | undefined;
  deleteComment: (commentId: string) => boolean;
  likeComment: (commentId: string) => boolean;
  recordActivity: (activity: Omit<UserActivity, 'id' | 'timestamp'>) => void;
  askUserName: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_CREDENTIALS: AdminCredentials = {
  userId: "sunnysoni",
  password: "*SunnyGalaxyAdmin"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userDetails, setUserDetailsState] = useState<UserDetails | null>(null);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [showNamePopup, setShowNamePopup] = useState<boolean>(false);
  const [nameInputCallback, setNameInputCallback] = useState<((name: string | null) => void) | null>(null);

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    const savedUserDetailsId = localStorage.getItem('currentUserDetailsId');
    
    if (savedAuth) setIsAuthenticated(savedAuth === 'true');
    if (savedRole) setUserRole(savedRole as UserRole);
    
    if (savedUserDetailsId) {
      const userDetails = dataService.getUserDetailsById(savedUserDetailsId);
      if (userDetails) {
        setUserDetailsState(userDetails);
      }
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userRole', userRole);
    
    if (userDetails) {
      localStorage.setItem('currentUserDetailsId', userDetails.id);
    }
  }, [isAuthenticated, userRole, userDetails]);

  const login = (userId: string, password: string) => {
    if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUserRole('admin');
      toast.success('Successfully logged in as admin');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
    setUserDetailsState(null);
    localStorage.removeItem('currentUserDetailsId');
    toast.success('Successfully logged out');
  };

  const saveUserDetails = (details: Omit<UserDetails, 'id'>) => {
    const savedDetails = dataService.addUserDetails(details);
    setUserDetailsState(savedDetails);
    setShowUserLogin(false);
    setIsAuthenticated(true);
    
    // Record login activity
    recordActivity({
      type: 'login',
      details: 'User logged in',
    });
    
    toast.success('User details saved. You are now logged in!');
  };

  const toggleRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    toast.success(`Switched to ${newRole} mode`);
  };

  const updateProfilePicture = (imageUrl: string) => {
    if (!userDetails) {
      toast.error("You must be logged in to update your profile picture");
      return;
    }

    const updatedDetails = dataService.updateUserDetails(userDetails.id, {
      profilePicture: imageUrl
    });
    
    if (updatedDetails) {
      setUserDetailsState(updatedDetails);
      toast.success("Profile picture updated successfully");
    }
  };
  
  const addComment = (
    comment: Omit<Comment, 'id' | 'timestamp' | 'likes'>, 
    anonymous: boolean = false
  ): Comment | undefined => {
    let userName = anonymous ? comment.userName : userDetails?.name || 'Anonymous';
    let userId = userDetails?.id;
    
    const newComment = dataService.addComment({
      ...comment,
      userName,
      userId,
      likes: 0
    });
    
    if (newComment && userDetails) {
      // Record activity
      recordActivity({
        type: 'comment',
        details: `Commented on ${comment.projectId ? 'project' : 'resource'}`,
        relatedItemId: comment.projectId || comment.resourceId,
      });
    }
    
    return newComment;
  };
  
  const updateComment = (commentId: string, text: string): Comment | undefined => {
    return dataService.updateComment(commentId, { text });
  };
  
  const deleteComment = (commentId: string): boolean => {
    return dataService.deleteComment(commentId);
  };
  
  const likeComment = (commentId: string): boolean => {
    const success = dataService.likeComment(commentId);
    
    if (success && userDetails) {
      const comment = dataService.getCommentById(commentId);
      if (comment) {
        // Record activity
        recordActivity({
          type: 'like',
          details: `Liked a comment`,
          relatedItemId: comment.projectId || comment.resourceId,
        });
      }
    }
    
    return success;
  };
  
  const recordActivity = (activity: Omit<UserActivity, 'id' | 'timestamp'>) => {
    if (!userDetails) return;
    
    dataService.addUserActivity(userDetails.id, activity);
  };
  
  const askUserName = (): Promise<string | null> => {
    return new Promise((resolve) => {
      setNameInputCallback(() => resolve);
      setShowNamePopup(true);
    });
  };
  
  const handleNameSubmit = (name: string | null) => {
    if (nameInputCallback) {
      nameInputCallback(name);
      setNameInputCallback(null);
    }
    setShowNamePopup(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      login, 
      logout,
      userDetails,
      setUserDetails: saveUserDetails,
      showUserLogin,
      setShowUserLogin,
      showAdminLogin,
      setShowAdminLogin,
      toggleRole,
      updateProfilePicture,
      addComment,
      updateComment,
      deleteComment,
      likeComment,
      recordActivity,
      askUserName
    }}>
      {children}
      
      {/* Name Input Popup */}
      {showNamePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-black/90 border border-white/20 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Enter Your Name</h2>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                if (name.trim()) {
                  handleNameSubmit(name);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                required
              />
              <div className="flex justify-end space-x-3">
                <GlowingButton 
                  type="button" 
                  color="cyan" 
                  className="text-sm"
                  onClick={() => handleNameSubmit(null)}
                >
                  Cancel
                </GlowingButton>
                <GlowingButton type="submit" className="text-sm">
                  Submit
                </GlowingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
