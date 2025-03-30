
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  ArrowLeft, ExternalLink, Calendar, MessageSquare, 
  Send, Download, Eye, FileText, File, Image as ImageIcon,
  Book, Link as LinkIcon, Star, X
} from 'lucide-react';
import { DataService } from '../services/DataService';
import { Resource, Comment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

// Initialize DataService
const dataService = DataService.getInstance();

const ResourceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  const { userDetails, userRole } = useAuth();
  
  useEffect(() => {
    if (id) {
      const resourceData = dataService.getResourceById(id);
      if (resourceData) {
        setResource(resourceData);
      } else {
        toast.error('Resource not found');
        navigate('/resources');
      }
      setLoading(false);
    }
  }, [id, navigate]);
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails) {
      toast.error('Please login to add a comment');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    if (resource && id) {
      const newComment: Partial<Comment> = {
        userId: userDetails.id,
        userName: userDetails.name || 'Anonymous',
        userImage: userDetails.profilePicture,
        message: comment.trim()
      };
      
      const success = dataService.addResourceComment(id, newComment);
      
      if (success) {
        toast.success('Comment added successfully');
        setComment('');
        
        // Refresh resource data
        const updatedResource = dataService.getResourceById(id);
        if (updatedResource) {
          setResource(updatedResource);
        }
      } else {
        toast.error('Failed to add comment');
      }
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-neon-pink" />;
      case 'Article':
        return <LinkIcon className="w-5 h-5 text-neon-blue" />;
      case 'Book':
        return <Book className="w-5 h-5 text-neon-purple" />;
      default:
        return <Star className="w-5 h-5 text-neon-blue" />;
    }
  };

  const handlePreviewImage = (imageUrl: string) => {
    setShowImagePreview(imageUrl);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <p>Loading resource details...</p>
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <p>Resource not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <GlowingButton onClick={() => navigate('/resources')} color="cyan" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </GlowingButton>

        <GlassCard className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
              {getIconForType(resource.type)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              
              {/* Resource Link */}
              <div className="mb-4">
                <GlowingButton color="cyan">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Resource
                  </a>
                </GlowingButton>
              </div>
              
              {/* Attachments Preview */}
              {resource.attachments && resource.attachments.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-semibold text-gray-300">Attachments</span>
                    <span className="text-xs bg-black/40 border border-white/10 rounded-full px-2 py-0.5">
                      {resource.attachments.length}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {resource.attachments.filter(att => att.type === 'image').slice(0, 3).map((attachment, idx) => (
                      <div 
                        key={idx}
                        className="w-14 h-14 flex-shrink-0 bg-black/40 rounded border border-white/10 overflow-hidden relative group"
                        onClick={() => handlePreviewImage(attachment.url)}
                      >
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-6 h-6 text-neon-blue" />
                        </div>
                        <img 
                          src={attachment.url} 
                          alt={attachment.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                    
                    {resource.attachments.length > 3 && (
                      <div className="w-14 h-14 flex-shrink-0 bg-black/40 rounded border border-white/10 flex items-center justify-center">
                        <span className="text-sm">+{resource.attachments.length - 3}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {resource.attachments.map((attachment, idx) => (
                      <a 
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={attachment.name}
                        className="flex items-center justify-between p-2 mb-1 last:mb-0 bg-black/40 rounded hover:bg-black/60"
                      >
                        <div className="flex items-center space-x-2">
                          {attachment.type === 'image' 
                            ? <ImageIcon className="w-4 h-4 text-neon-pink" /> 
                            : <FileText className="w-4 h-4 text-neon-blue" />
                          }
                          <span className="text-sm truncate max-w-[180px]">{attachment.name}</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-gray-400 text-sm">
                Added on <Calendar className="inline w-4 h-4 mr-1 align-bottom" /> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Comments Section */}
        <GlassCard className="mt-6 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-neon-blue" />
            Comments
          </h2>
          
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
                {userDetails?.profilePicture ? (
                  <img src={userDetails.profilePicture} alt={userDetails.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm">{userDetails?.name?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              />
              <GlowingButton type="submit">
                <Send className="w-4 h-4" />
              </GlowingButton>
            </div>
          </form>
          
          {/* Display Comments */}
          {resource.comments && resource.comments.length > 0 ? (
            resource.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
                  {comment.userImage ? (
                    <img src={comment.userImage} alt={comment.userName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm">{comment.userName?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold">{comment.userName}</div>
                  <div className="text-xs text-gray-400">
                    <Calendar className="inline w-3 h-3 mr-1 align-bottom" />
                    {new Date(comment.date).toLocaleDateString()}
                  </div>
                  <p className="text-gray-300">{comment.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </GlassCard>
      </div>
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowImagePreview(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={showImagePreview} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white hover:text-neon-blue"
              onClick={(e) => {
                e.stopPropagation();
                const a = document.createElement('a');
                a.href = showImagePreview;
                a.download = 'image';
                a.click();
              }}
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ResourceDetails;
