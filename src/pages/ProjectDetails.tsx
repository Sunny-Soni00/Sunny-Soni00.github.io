import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  ArrowLeft, Github, ExternalLink, Calendar, MessageSquare, 
  Send, Download, Eye, FileText, File, Image as ImageIcon,
  Film, Music
} from 'lucide-react';
import { DataService, dataService } from '../services/DataService';
import { Project, Comment, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  const { userDetails, userRole } = useAuth();
  
  useEffect(() => {
    if (id) {
      const projectData = dataService.getProjectById(id);
      if (projectData) {
        setProject(projectData);
      } else {
        toast.error('Project not found');
        navigate('/projects');
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
    
    if (project && id) {
      const newComment: Partial<Comment> = {
        userId: userDetails.id,
        userName: userDetails.name || 'Anonymous',
        userImage: userDetails.profilePicture,
        message: comment.trim()
      };
      
      const success = dataService.addProjectComment(id, newComment);
      
      if (success) {
        toast.success('Comment added successfully');
        setComment('');
        
        // Refresh project data
        const updatedProject = dataService.getProjectById(id);
        if (updatedProject) {
          setProject(updatedProject);
        }
      } else {
        toast.error('Failed to add comment');
      }
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

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading project details...</p>
        </div>
      </Layout>
    );
  }
  
  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Project not found</p>
          <GlowingButton onClick={() => navigate('/projects')} className="mt-4">
            Back to Projects
          </GlowingButton>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </button>
        
        <div className="mb-8 rounded-lg overflow-hidden relative group h-72 bg-black/20 border border-white/10">
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
            <Eye className="w-12 h-12 text-neon-blue" />
          </div>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
            onClick={() => setShowImagePreview(project.image)}
          />
        </div>
        
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <span className="px-2 py-1 rounded-full text-xs bg-neon-blue/20 text-neon-blue">
                {project.category}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 my-2">
              {project.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-black/30 border border-white/10 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
            </div>
            
            {project.attachments && project.attachments.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <h2 className="font-semibold mb-4">Attachments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.attachments.map((attachment) => (
                    <div 
                      key={attachment.id} 
                      className="border border-white/10 rounded-md p-3 bg-black/30"
                    >
                      {attachment.type === 'image' ? (
                        <div className="space-y-2">
                          <div className="h-40 bg-black/60 rounded-md flex items-center justify-center overflow-hidden">
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
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
            
            <div className="border-t border-white/10 pt-4 flex flex-wrap gap-4">
              {project.demoLink && (
                <a 
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlowingButton color="cyan" className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </GlowingButton>
                </a>
              )}
              
              {project.repoLink && (
                <a 
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlowingButton color="purple" className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </GlowingButton>
                </a>
              )}
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <h2 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-neon-blue" />
                Comments
              </h2>
              
              {userDetails ? (
                <div className="flex space-x-3 mb-6">
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment..."
                    className="flex-1 bg-black/30 border border-white/10 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-neon-blue"
                    rows={2}
                  />
                  <GlowingButton
                    onClick={(e: any) => handleAddComment(e)}
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
              
              <div className="space-y-4">
                {project.comments && project.comments.length > 0 ? (
                  project.comments.map((comment) => (
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

export default ProjectDetails;
