
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  ArrowLeft, ExternalLink, FileText, Eye, Download, MessageSquare, Send, Image as ImageIcon, File, Film, Music 
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Resource, Comment, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const ResourceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, userDetails } = useAuth();
  
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundResource = dataService.getResourceById(id);
      if (foundResource) {
        setResource(foundResource);
      } else {
        toast.error('Resource not found');
        navigate('/resources');
      }
    }
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading resource details...</p>
        </div>
      </Layout>
    );
  }
  
  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Resource not found</p>
          <GlowingButton onClick={() => navigate('/resources')} className="mt-4">
            Back to Resources
          </GlowingButton>
        </div>
      </Layout>
    );
  }

  const handleAddComment = () => {
    if (!isAuthenticated || !userDetails) {
      toast.error('Please log in to add a comment');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    const newComment: Omit<Comment, 'id'> = {
      userId: userDetails.id,
      userName: userDetails.name,
      userImage: userDetails.profilePicture,
      message: comment,
      date: new Date().toISOString()
    };
    
    const updatedResource = dataService.addResourceComment(resource.id, newComment);
    if (updatedResource) {
      setResource(updatedResource);
      setComment('');
      toast.success('Comment added successfully');
    }
  };
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Film className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (type.includes('pdf')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handlePreviewAttachment = (attachment: Attachment) => {
    if (attachment.type === 'image') {
      setShowImagePreview(attachment.url);
    } else {
      window.open(attachment.url, '_blank');
    }
  };

  const getCategoryColor = () => {
    switch (resource.category) {
      case 'AI & ML':
        return 'bg-neon-purple/20 text-neon-purple';
      case 'Web Development':
        return 'bg-neon-blue/20 text-neon-blue';
      case 'UI/UX Design':
        return 'bg-neon-pink/20 text-neon-pink';
      default:
        return 'bg-white/20 text-white';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/resources')}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </button>
        
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold">{resource.title}</h1>
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor()}`}>
                {resource.category}
              </span>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-300 whitespace-pre-line">{resource.description}</p>
            </div>
            
            {resource.attachments && resource.attachments.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <h2 className="font-semibold mb-4">Attachments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resource.attachments.map((attachment) => (
                    <div 
                      key={attachment.id} 
                      className="border border-white/10 rounded-md p-3 bg-black/30"
                    >
                      {attachment.type === 'image' ? (
                        <div className="space-y-2">
                          <div className="h-40 bg-black/60 rounded-md flex items-center justify-center overflow-hidden">
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-100 hover:opacity-0 transition-opacity">
                                <Eye className="w-8 h-8 text-neon-blue" />
                              </div>
                              <img 
                                src={attachment.url} 
                                alt={attachment.name}
                                className="w-full h-full object-contain p-2" 
                                onClick={() => handlePreviewAttachment(attachment)}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm truncate">
                              <ImageIcon className="w-4 h-4 text-neon-pink" />
                              <span className="truncate max-w-[150px]">{attachment.name}</span>
                            </div>
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => handlePreviewAttachment(attachment)}
                                className="p-1 hover:text-neon-blue"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <a 
                                href={attachment.url}
                                download={attachment.name}
                                className="p-1 hover:text-neon-blue"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="h-40 bg-black/60 rounded-md flex items-center justify-center text-white/50">
                            {getFileIcon(attachment.type)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm truncate">
                              <FileText className="w-4 h-4 text-neon-blue" />
                              <span className="truncate max-w-[150px]">{attachment.name}</span>
                            </div>
                            <a 
                              href={attachment.url}
                              download={attachment.name}
                              className="p-1 hover:text-neon-blue"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t border-white/10 pt-4">
              <a 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <GlowingButton color="cyan" className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Resource
                </GlowingButton>
              </a>
            </div>
            
            {/* Comments Section */}
            <div className="border-t border-white/10 pt-4">
              <h2 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-neon-blue" />
                Comments
              </h2>
              
              {isAuthenticated ? (
                <div className="flex space-x-3 mb-6">
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment..."
                    className="flex-1 bg-black/30 border border-white/10 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    rows={2}
                  />
                  <GlowingButton
                    onClick={handleAddComment}
                    className="self-end"
                    color="cyan"
                  >
                    <Send className="w-4 h-4" />
                  </GlowingButton>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-black/30 border border-white/10 rounded-md text-center">
                  <p className="text-gray-400">Please log in to add a comment</p>
                </div>
              )}
              
              {/* Comments List */}
              <div className="space-y-4">
                {resource.comments && resource.comments.length > 0 ? (
                  resource.comments.map((comment) => (
                    <div 
                      key={comment.id}
                      className="bg-black/20 border border-white/10 rounded-md p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-black/60 overflow-hidden flex-shrink-0 border border-white/20">
                          {comment.userImage ? (
                            <img 
                              src={comment.userImage} 
                              alt={comment.userName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                              {comment.userName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{comment.userName}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300 mt-1">{comment.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
              onClick={() => setShowImagePreview(null)}
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
