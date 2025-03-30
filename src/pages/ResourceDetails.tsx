import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/DataService';
import { Resource, Comment } from '../models/DataModels';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { ArrowLeft, Download, Link as LinkIcon, MessageSquare, ThumbsUp, Edit, Trash } from 'lucide-react';

const ResourceDetails = () => {
  const { userDetails, addComment, askUserName, isAuthenticated, userRole } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [showAllAttachments, setShowAllAttachments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  useEffect(() => {
    if (id) {
      const fetchedResource = dataService.getResourceById(id);
      setResource(fetchedResource);
      
      if (fetchedResource) {
        const fetchedComments = dataService.getCommentsByResourceId(id);
        setComments(fetchedComments);
      }
    }
  }, [id]);
  
  useEffect(() => {
    if (id) {
      const fetchedComments = dataService.getCommentsByResourceId(id);
      setComments(fetchedComments);
    }
  }, [id, resource]);
  
  const handleAddComment = async () => {
    if (!isAuthenticated && !isAnonymous) {
      const name = await askUserName();
      if (!name) {
        alert('Please enter your name to comment.');
        return;
      }
    }
    
    if (newCommentText.trim()) {
      const newComment: Omit<Comment, 'id' | 'timestamp' | 'likes'> = {
        text: newCommentText,
        userName: userDetails?.name || 'Anonymous',
        resourceId: id,
        projectId: undefined
      };
      
      addComment(newComment, isAnonymous);
      setNewCommentText('');
      setShowCommentInput(false);
      setIsAnonymous(false);
    }
  };
  
  const handleEditComment = (commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditedCommentText(text);
  };
  
  const handleUpdateComment = () => {
    if (editingCommentId && editedCommentText.trim()) {
      dataService.updateComment(editingCommentId, { text: editedCommentText.trim() });
      setEditingCommentId(null);
      setEditedCommentText('');
      
      // Refresh comments
      if (id) {
        const fetchedComments = dataService.getCommentsByResourceId(id);
        setComments(fetchedComments);
      }
    }
  };
  
  const handleDeleteComment = (commentId: string) => {
    dataService.deleteComment(commentId);
    
    // Refresh comments
    if (id) {
      const fetchedComments = dataService.getCommentsByResourceId(id);
      setComments(fetchedComments);
    }
  };
  
  const handleLikeComment = (commentId: string) => {
    dataService.likeComment(commentId);
    
    // Refresh comments
    if (id) {
      const fetchedComments = dataService.getCommentsByResourceId(id);
      setComments(fetchedComments);
    }
  };
  
  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <GlassCard className="text-center">
            <p className="text-gray-300">Loading resource details...</p>
          </GlassCard>
        </div>
      </Layout>
    );
  }
  
  const visibleAttachments = showAllAttachments ? resource.attachments : resource.attachments?.slice(0, 3);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <GlassCard className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link to="/resources" className="flex items-center text-neon-blue hover:text-neon-blue-light transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Resources
            </Link>
            
            {resource.link && (
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center neon-text hover:text-neon-blue-light transition-colors">
                Visit Resource <LinkIcon className="w-5 h-5 ml-2" />
              </a>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
          <p className="text-gray-300 mb-4">{resource.description}</p>
          
          <div className="flex items-center text-gray-400 mb-4">
            <span className="mr-2">Type: {resource.type}</span>
            <span>Category: {resource.category}</span>
          </div>
          
          {/* Attachments Section */}
          {resource.attachments && resource.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleAttachments?.map((attachment) => (
                  <GlassCard key={attachment.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">{attachment.name}</h4>
                        <p className="text-sm text-gray-400">{attachment.type}</p>
                      </div>
                      <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-5 h-5 text-neon-blue hover:text-neon-blue-light transition-colors" />
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </div>
              
              {resource.attachments.length > 3 && (
                <button onClick={() => setShowAllAttachments(!showAllAttachments)} className="text-neon-blue hover:text-neon-blue-light transition-colors mt-2">
                  {showAllAttachments ? 'Show Less' : `Show All (${resource.attachments.length})`}
                </button>
              )}
            </div>
          )}
        </GlassCard>
        
        {/* Comments Section */}
        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          
          {/* Add Comment Input */}
          {isAuthenticated && (
            <div className="mb-4">
              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-neon-blue rounded bg-black border-white/20 focus:ring-0 mr-2"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                />
                <span className="text-gray-400">Comment as Anonymous</span>
              </label>
              
              {showCommentInput ? (
                <div className="flex flex-col">
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add your comment..."
                    className="w-full p-3 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white mb-2"
                  />
                  <div className="flex justify-end space-x-2">
                    <GlowingButton onClick={handleAddComment} className="text-sm">
                      Post Comment
                    </GlowingButton>
                    <GlowingButton color="pink" onClick={() => setShowCommentInput(false)} className="text-sm">
                      Cancel
                    </GlowingButton>
                  </div>
                </div>
              ) : (
                <GlowingButton onClick={() => setShowCommentInput(true)} className="text-sm">
                  Add a Comment
                </GlowingButton>
              )}
            </div>
          )}
          
          {!isAuthenticated && (
            <div className="mb-4">
              <p className="text-gray-400">
                Please <Link to="/login" className="text-neon-blue">log in</Link> to add a comment.
              </p>
            </div>
          )}
          
          {/* Display Comments */}
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <GlassCard key={comment.id} className="mb-4 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-300 font-semibold">{comment.userName}</div>
                    <div className="text-gray-500 text-sm">{new Date(comment.timestamp).toLocaleDateString()}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
                
                {editingCommentId === comment.id ? (
                  <div className="flex flex-col">
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white mb-2"
                    />
                    <div className="flex justify-end space-x-2">
                      <GlowingButton onClick={handleUpdateComment} className="text-sm">
                        Update
                      </GlowingButton>
                      <GlowingButton color="pink" onClick={() => setEditingCommentId(null)} className="text-sm">
                        Cancel
                      </GlowingButton>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-300">{comment.text}</p>
                )}
                
                {(comment.userId === userDetails?.id || userRole === 'admin') && (
                  <div className="flex space-x-2">
                    {editingCommentId !== comment.id && (
                      <button
                        onClick={() => handleEditComment(comment.id, comment.text)}
                        className="flex items-center text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </GlassCard>
            ))
          )}
        </GlassCard>
      </div>
    </Layout>
  );
};

export default ResourceDetails;
