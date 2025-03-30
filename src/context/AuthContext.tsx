import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AdminCredentials, UserDetails, UserActivity, Comment, Reply, Attachment } from '../models/DataModels';
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
  updateProfilePicture: (imageUrl: string, fileType: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'replies'>, anonymous?: boolean) => Comment | undefined;
  updateComment: (commentId: string, text: string) => Comment | undefined;
  deleteComment: (commentId: string) => boolean;
  likeComment: (commentId: string) => boolean;
  addReply: (commentId: string, reply: Omit<Reply, 'id' | 'timestamp' | 'likes' | 'likedBy'>) => Reply | undefined;
  deleteReply: (commentId: string, replyId: string) => boolean;
  likeReply: (commentId: string, replyId: string) => boolean;
  addCommentAttachment: (commentId: string, attachment: Omit<Attachment, 'id'>) => Attachment | null;
  recordActivity: (activity: Omit<UserActivity, 'id' | 'timestamp'>) => void;
  askUserName: () => Promise<string | null>;
  hasLikedComment: (commentId: string) => boolean;
  hasLikedReply: (commentId: string, replyId: string) => boolean;
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

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userRole', userRole);
    
    if (userDetails) {
      localStorage.setItem('currentUserDetailsId', userDetails.id);
    }
  }, [isAuthenticated, userRole, userDetails]);

  const login = (userId: string, password: string) => {
    try {
      if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        setUserRole('admin');
        toast.success('Successfully logged in as admin');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error('An error occurred during login');
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
    try {
      let profilePictureType = undefined;
      if (details.profilePicture) {
        const match = details.profilePicture.match(/data:image\/(\w+);/);
        profilePictureType = match ? `.${match[1]}` : undefined;
      }

      const enhancedDetails = {
        ...details,
        profilePictureType
      };

      const savedDetails = dataService.addUserDetails(enhancedDetails);
      setUserDetailsState(savedDetails);
      setShowUserLogin(false);
      setIsAuthenticated(true);
      
      recordActivity({
        type: 'login',
        details: 'User logged in',
      });
      
      toast.success('User details saved. You are now logged in!');
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error('Could not save user details. Please try again.');
    }
  };

  const toggleRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    toast.success(`Switched to ${newRole} mode`);
  };

  const updateProfilePicture = (imageUrl: string, fileType: string) => {
    if (!userDetails) {
      toast.error("You must be logged in to update your profile picture");
      return;
    }

    try {
      const updatedDetails = dataService.updateUserDetails(userDetails.id, {
        profilePicture: imageUrl,
        profilePictureType: fileType
      });
      
      if (updatedDetails) {
        setUserDetailsState(updatedDetails);
        toast.success("Profile picture updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    }
  };
  
  const addComment = (
    comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'replies'>, 
    anonymous: boolean = false
  ): Comment | undefined => {
    let userName = anonymous ? comment.userName : userDetails?.name || 'Anonymous';
    let userId = userDetails?.id;
    
    try {
      const newComment = dataService.addComment({
        ...comment,
        userName,
        userId,
        likes: 0,
        likedBy: [],
        replies: []
      });
      
      if (newComment && userDetails) {
        recordActivity({
          type: 'comment',
          details: `Commented on ${comment.projectId ? 'project' : 'resource'}`,
          relatedItemId: comment.projectId || comment.resourceId,
        });
      }
      
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
      return undefined;
    }
  };
  
  const updateComment = (commentId: string, text: string): Comment | undefined => {
    return dataService.updateComment(commentId, { text });
  };
  
  const deleteComment = (commentId: string): boolean => {
    return dataService.deleteComment(commentId);
  };
  
  const likeComment = (commentId: string): boolean => {
    if (!userDetails) {
      toast.error("You must be logged in to like a comment");
      return false;
    }

    try {
      const comment = dataService.getCommentById(commentId);
      if (comment && comment.likedBy?.includes(userDetails.id)) {
        toast.error("You've already liked this comment");
        return false;
      }

      const success = dataService.likeComment(commentId, userDetails.id);
      
      if (success && userDetails) {
        const comment = dataService.getCommentById(commentId);
        if (comment) {
          recordActivity({
            type: 'like',
            details: `Liked a comment`,
            relatedItemId: comment.projectId || comment.resourceId,
          });
        }
      }
      
      return success;
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Failed to like comment");
      return false;
    }
  };

  const addReply = (
    commentId: string,
    reply: Omit<Reply, 'id' | 'timestamp' | 'likes' | 'likedBy'>
  ): Reply | undefined => {
    if (!userDetails) {
      toast.error("You must be logged in to reply to a comment");
      return undefined;
    }

    try {
      const newReply = dataService.addReply(commentId, {
        ...reply,
        userId: userDetails.id,
        likes: 0,
        likedBy: []
      });

      if (newReply) {
        recordActivity({
          type: 'reply',
          details: `Replied to a comment`,
          relatedItemId: commentId,
        });
      }

      return newReply;
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply");
      return undefined;
    }
  };

  const deleteReply = (commentId: string, replyId: string): boolean => {
    try {
      return dataService.deleteReply(commentId, replyId);
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Failed to delete reply");
      return false;
    }
  };

  const likeReply = (commentId: string, replyId: string): boolean => {
    if (!userDetails) {
      toast.error("You must be logged in to like a reply");
      return false;
    }

    try {
      const comment = dataService.getCommentById(commentId);
      const reply = comment?.replies?.find(r => r.id === replyId);
      
      if (reply && reply.likedBy?.includes(userDetails.id)) {
        toast.error("You've already liked this reply");
        return false;
      }

      return dataService.likeReply(commentId, replyId, userDetails.id);
    } catch (error) {
      console.error("Error liking reply:", error);
      toast.error("Failed to like reply");
      return false;
    }
  };

  const addCommentAttachment = (commentId: string, attachment: Omit<Attachment, 'id'>): Attachment | null => {
    try {
      return dataService.addCommentAttachment(commentId, attachment);
    } catch (error) {
      console.error("Error adding comment attachment:", error);
      toast.error("Failed to add attachment");
      return null;
    }
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
      addReply,
      deleteReply,
      likeReply,
      addCommentAttachment,
      recordActivity,
      askUserName,
      hasLikedComment,
      hasLikedReply
    }}>
      {children}
      
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
