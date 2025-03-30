
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  ArrowLeft, ExternalLink, Github, Edit, 
  Trash2, MessageSquare, Heart, Image, File
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Project, Comment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  const { isAuthenticated, userDetails, userRole, addComment, updateComment, deleteComment, likeComment, askUserName } = useAuth();
  
  useEffect(() => {
    if (id) {
      const projectData = dataService.getProjectById(id);
      if (projectData) {
        setProject(projectData);
        
        // Record view activity if authenticated
        if (isAuthenticated && userDetails) {
          dataService.addUserActivity(userDetails.id, {
            type: 'view',
            details: `Viewed project: ${projectData.title}`,
            relatedItemId: id
          });
        }
      } else {
        toast.error('Project not found');
        navigate('/projects');
      }
      setLoading(false);
    }
  }, [id, isAuthenticated, navigate, userDetails]);
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    let userName = userDetails?.name || '';
    let anonymous = false;
    
    if (!isAuthenticated) {
      const name = await askUserName();
      if (!name) return; // User canceled
      userName = name;
      anonymous = true;
    }
    
    if (project) {
      const newComment = addComment({
        text: commentText,
        userName,
        projectId: project.id,
      }, anonymous);
      
      if (newComment) {
        setCommentText('');
        // Update project in state
        setProject(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            comments: [...(prev.comments || []), newComment]
          };
        });
        toast.success('Comment added successfully');
      }
    }
  };
  
  const handleEditComment = (commentId: string) => {
    if (!project?.comments) return;
    
    const comment = project.comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditingCommentText(comment.text);
    }
  };
  
  const handleUpdateComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingCommentId || !editingCommentText.trim()) {
      setEditingCommentId(null);
      return;
    }
    
    const updatedComment = updateComment(editingCommentId, editingCommentText);
    
    if (updatedComment && project) {
      // Update project in state
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: prev.comments?.map(c => 
            c.id === editingCommentId ? updatedComment : c
          )
        };
      });
      toast.success('Comment updated successfully');
    }
    
    setEditingCommentId(null);
    setEditingCommentText('');
  };
  
  const handleDeleteComment = (commentId: string) => {
    if (deleteComment(commentId) && project) {
      // Update project in state
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: prev.comments?.filter(c => c.id !== commentId)
        };
      });
      toast.success('Comment deleted successfully');
    }
  };
  
  const handleLikeComment = (commentId: string) => {
    if (likeComment(commentId) && project) {
      // Update project in state
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: prev.comments?.map(c => 
            c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
          )
        };
      });
    }
  };
  
  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const getFileIcon = (attachment: any) => {
    if (attachment.type === 'image') return <Image className="w-5 h-5 text-neon-pink" />;
    return <File className="w-5 h-5 text-neon-blue" />;
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center">
            <div className="animate-pulse bg-black/30 border border-white/10 rounded-lg h-96 w-full max-w-4xl"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
            <GlowingButton onClick={() => navigate('/projects')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
            </GlowingButton>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <GlowingButton onClick={() => navigate('/projects')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </GlowingButton>
          
          <h1 className="text-3xl md:text-4xl font-bold neon-text mb-2">{project.title}</h1>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm bg-black/40 border border-white/10 rounded-full px-3 py-1">
              {project.category}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Main project image */}
            <div className="mb-8">
              <div 
                className="cursor-pointer border border-white/10 rounded-lg overflow-hidden aspect-video bg-black/40 flex items-center justify-center"
                onClick={() => setShowImagePreview(project.image)}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Click to enlarge</span>
                </div>
              </div>
            </div>
            
            <GlassCard className="p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-300 mb-6 whitespace-pre-line">{project.description}</p>
              
              <div className="flex flex-wrap space-x-2 mb-6">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-black/40 border border-white/20 rounded-full px-3 py-1 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {project.demoLink && (
                  <GlowingButton color="cyan" className="text-sm w-full sm:w-auto justify-center">
                    <a href={project.demoLink} className="flex items-center" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Demo
                    </a>
                  </GlowingButton>
                )}
                
                {project.repoLink && (
                  <GlowingButton color="purple" className="text-sm w-full sm:w-auto justify-center">
                    <a href={project.repoLink} className="flex items-center" target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3 mr-1" />
                      View Repository
                    </a>
                  </GlowingButton>
                )}
              </div>
              
              {project.attachments && project.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Attachments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.attachments.map((attachment) => (
                      <div key={attachment.id} className="relative group">
                        {attachment.type === 'image' ? (
                          <div 
                            className="cursor-pointer border border-white/10 rounded overflow-hidden aspect-video bg-black/40 flex items-center justify-center"
                            onClick={() => setShowImagePreview(attachment.url)}
                          >
                            <img 
                              src={attachment.url} 
                              alt={attachment.name}
                              className="object-cover w-full h-full" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">Click to preview</span>
                            </div>
                          </div>
                        ) : (
                          <a 
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-black/40 border border-white/10 rounded hover:bg-black/60 transition-colors"
                          >
                            {getFileIcon(attachment)}
                            <span className="ml-2 text-sm truncate">{attachment.name}</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
            
            {/* Comments Section */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Comments ({project.comments?.length || 0})
              </h2>
              
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="mb-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[100px]"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <GlowingButton type="submit" className="text-sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Add Comment
                  </GlowingButton>
                </div>
              </form>
              
              {project.comments && project.comments.length > 0 ? (
                <div className="space-y-4">
                  {project.comments.map((comment) => (
                    <div key={comment.id} className="bg-black/40 border border-white/10 rounded-lg p-4">
                      {editingCommentId === comment.id ? (
                        <form onSubmit={handleUpdateComment} className="mb-2">
                          <textarea
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue transition-all min-h-[80px] mb-2"
                            required
                          ></textarea>
                          <div className="flex justify-end space-x-2">
                            <GlowingButton 
                              type="button" 
                              onClick={() => setEditingCommentId(null)} 
                              className="text-xs py-1"
                            >
                              Cancel
                            </GlowingButton>
                            <GlowingButton type="submit" className="text-xs py-1">
                              Save
                            </GlowingButton>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-neon-blue/30 flex items-center justify-center mr-2">
                                {comment.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{comment.userName}</div>
                                <div className="text-gray-400 text-xs">{formatDate(comment.timestamp)}</div>
                              </div>
                            </div>
                            
                            {(userDetails?.id === comment.userId || userRole === 'admin') && (
                              <div className="flex space-x-1">
                                <button 
                                  onClick={() => handleEditComment(comment.id)}
                                  className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-white mb-3">{comment.text}</p>
                          
                          <div className="flex items-center justify-end">
                            <button 
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center text-gray-400 hover:text-neon-pink transition-colors"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              <span className="text-xs">{comment.likes || 0}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </GlassCard>
          </div>
          
          <div className="lg:col-span-1">
            <GlassCard className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Project Info</h2>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="text-gray-400 text-sm">Category</span>
                  <span className="font-medium">{project.category}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-gray-400 text-sm">Technology Stack</span>
                  <div className="flex flex-wrap mt-1">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-black/40 border border-white/20 rounded-full px-2 py-0.5 mr-1 mb-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>
                <li className="flex flex-col">
                  <span className="text-gray-400 text-sm">Attachment Count</span>
                  <span className="font-medium">{project.attachments?.length || 0}</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setShowImagePreview(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={showImagePreview} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white"
              onClick={() => setShowImagePreview(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetails;
