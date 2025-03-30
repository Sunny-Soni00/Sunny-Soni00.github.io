
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from './GlassCard';
import GlowingButton from './GlowingButton';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageSquare, 
  ThumbsUp, 
  Edit, 
  Trash, 
  Send, 
  Reply, 
  Paperclip,
  FileImage,
  File,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Comment, Reply as ReplyType, Attachment } from '../models/DataModels';
import { toast } from 'sonner';

interface CommentSystemProps {
  projectId?: string;
  resourceId?: string;
  comments: Comment[];
  onCommentsUpdate: () => void;
}

const CommentSystem: React.FC<CommentSystemProps> = ({ 
  projectId, 
  resourceId, 
  comments, 
  onCommentsUpdate 
}) => {
  const { 
    isAuthenticated,
    userDetails,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    addReply,
    deleteReply,
    likeReply,
    askUserName,
    hasLikedComment,
    hasLikedReply,
    addCommentAttachment
  } = useAuth();
  
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create preview for image files
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    let userName = userDetails?.name;

    if (!isAuthenticated) {
      userName = await askUserName();
      if (!userName) return; // User cancelled
    }

    const commentData = {
      text: newComment,
      userName: userName || 'Anonymous',
      projectId,
      resourceId,
      attachments: []
    };

    const createdComment = addComment(commentData, !isAuthenticated);
    
    if (createdComment && selectedFile) {
      // Handle file attachment
      const fileType = selectedFile.type;
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const attachment: Omit<Attachment, 'id'> = {
          name: selectedFile.name,
          url: reader.result as string,
          type: fileType.startsWith('image/') ? 'image' : 'document',
          fileType: `.${selectedFile.name.split('.').pop() || ''}`
        };
        
        addCommentAttachment(createdComment.id, attachment);
        onCommentsUpdate();
      };
      
      reader.readAsDataURL(selectedFile);
    }

    setNewComment('');
    setSelectedFile(null);
    setPreviewUrl(null);
    onCommentsUpdate();
  };

  const handleToggleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    updateComment(commentId, editText);
    setEditingCommentId(null);
    onCommentsUpdate();
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentId);
      onCommentsUpdate();
    }
  };

  const handleLike = (commentId: string) => {
    if (hasLikedComment(commentId)) {
      toast.error("You've already liked this comment");
      return;
    }
    
    likeComment(commentId);
    onCommentsUpdate();
  };

  const handleToggleReply = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyText('');
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    let userName = userDetails?.name;

    if (!isAuthenticated) {
      userName = await askUserName();
      if (!userName) return; // User cancelled
    }

    addReply(commentId, {
      text: replyText,
      userName: userName || 'Anonymous'
    });

    setReplyingTo(null);
    setReplyText('');
    onCommentsUpdate();
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      deleteReply(commentId, replyId);
      onCommentsUpdate();
    }
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    if (hasLikedReply(commentId, replyId)) {
      toast.error("You've already liked this reply");
      return;
    }
    
    likeReply(commentId, replyId);
    onCommentsUpdate();
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const canEditOrDelete = (userId?: string) => {
    return isAuthenticated && (userDetails?.id === userId || userDetails?.id === 'admin');
  };

  const renderAttachment = (attachment: Attachment) => {
    if (attachment.type === 'image') {
      return (
        <div key={attachment.id} className="relative inline-block mr-2 mb-2">
          <button 
            className="group relative w-12 h-12 bg-black/30 rounded border border-white/30 overflow-hidden" 
            onClick={() => window.open(attachment.url, '_blank')}
          >
            <img 
              src={attachment.url} 
              alt={attachment.name} 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FileImage className="w-5 h-5 text-white group-hover:opacity-0 transition-opacity" />
            </div>
          </button>
        </div>
      );
    } else {
      return (
        <a 
          key={attachment.id}
          href={attachment.url} 
          download={attachment.name}
          className="inline-flex items-center px-3 py-1 mr-2 mb-2 bg-black/40 border border-white/20 rounded text-sm hover:bg-black/60 hover:border-neon-blue/70 transition-colors"
        >
          <File className="w-4 h-4 mr-1" />
          {attachment.name.length > 15 ? `${attachment.name.slice(0, 12)}...` : attachment.name}
        </a>
      );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-left">Comments</h3>
      
      {/* New comment form */}
      <GlassCard className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            {userDetails?.profilePicture ? (
              <AvatarImage src={userDetails.profilePicture} />
            ) : (
              <AvatarFallback className="bg-neon-blue/30">
                {userDetails?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              rows={3}
            />
            
            {/* File attachment preview */}
            {previewUrl && selectedFile?.type.startsWith('image/') && (
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-20 max-w-full object-cover rounded border border-white/30" 
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-black/80 border border-white/30 rounded-full flex items-center justify-center"
                >
                  <Trash className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {selectedFile && !selectedFile.type.startsWith('image/') && (
              <div className="inline-flex items-center px-3 py-1 bg-black/40 border border-white/20 rounded text-sm">
                <File className="w-4 h-4 mr-1" />
                {selectedFile.name.length > 20 ? `${selectedFile.name.slice(0, 17)}...` : selectedFile.name}
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="ml-2"
                >
                  <Trash className="w-3 h-3" />
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="comment-attachment"
                />
                <label
                  htmlFor="comment-attachment"
                  className="inline-flex items-center px-3 py-1 bg-black/40 border border-white/20 rounded text-sm cursor-pointer hover:bg-black/60 hover:border-white/40 transition-colors"
                >
                  <Paperclip className="w-4 h-4 mr-1" />
                  Attach File
                </label>
              </div>
              <GlowingButton
                onClick={handleSubmitComment}
                className="py-1 px-4 text-sm flex items-center"
              >
                <Send className="w-4 h-4 mr-1" />
                Post Comment
              </GlowingButton>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <GlassCard key={comment.id} className="p-4">
              <div className="flex space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-neon-blue/30">
                    {comment.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{comment.userName}</span>
                    <span className="text-xs text-gray-400">{formatDate(comment.timestamp)}</span>
                  </div>
                  
                  {editingCommentId === comment.id ? (
                    <div className="mb-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md 
                        focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                        rows={2}
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <GlowingButton
                          onClick={() => setEditingCommentId(null)}
                          color="pink"
                          className="py-1 px-3 text-xs"
                        >
                          Cancel
                        </GlowingButton>
                        <GlowingButton
                          onClick={() => handleSaveEdit(comment.id)}
                          className="py-1 px-3 text-xs"
                        >
                          Save
                        </GlowingButton>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-200 mb-2">{comment.text}</p>
                  )}
                  
                  {/* Attachments */}
                  {comment.attachments && comment.attachments.length > 0 && (
                    <div className="mb-3">
                      {comment.attachments.map(attachment => renderAttachment(attachment))}
                    </div>
                  )}
                  
                  {/* Comment actions */}
                  <div className="flex items-center text-gray-400 text-sm">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center mr-4 hover:text-white transition-colors 
                        ${hasLikedComment(comment.id) ? 'text-neon-blue' : ''}`}
                      disabled={hasLikedComment(comment.id)}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {comment.likes || 0}
                    </button>
                    
                    <button
                      onClick={() => handleToggleReply(comment.id)}
                      className="flex items-center mr-4 hover:text-white transition-colors"
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </button>
                    
                    {comment.replies && comment.replies.length > 0 && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="flex items-center mr-4 hover:text-white transition-colors"
                      >
                        {expandedReplies.includes(comment.id) ? (
                          <ChevronUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        )}
                        {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                      </button>
                    )}
                    
                    {canEditOrDelete(comment.userId) && (
                      <>
                        <button
                          onClick={() => handleToggleEdit(comment)}
                          className="flex items-center mr-4 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="mt-3 pl-4 border-l border-gray-700">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-neon-purple/30 text-xs">
                            {userDetails?.name?.charAt(0) || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md 
                            focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                            rows={2}
                          />
                          <div className="flex justify-end space-x-2">
                            <GlowingButton
                              onClick={() => setReplyingTo(null)}
                              color="pink"
                              className="py-1 px-3 text-xs"
                            >
                              Cancel
                            </GlowingButton>
                            <GlowingButton
                              onClick={() => handleSubmitReply(comment.id)}
                              className="py-1 px-3 text-xs"
                            >
                              Reply
                            </GlowingButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && expandedReplies.includes(comment.id) && (
                    <div className="mt-3 space-y-3 pl-4 border-l border-gray-700">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-2">
                          <div className="flex space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-neon-purple/30 text-xs">
                                {reply.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-sm">{reply.userName}</span>
                                <span className="text-xs text-gray-400">{formatDate(reply.timestamp)}</span>
                              </div>
                              <p className="text-gray-200 text-sm mb-1">{reply.text}</p>
                              
                              {/* Reply actions */}
                              <div className="flex items-center text-gray-400 text-xs">
                                <button
                                  onClick={() => handleLikeReply(comment.id, reply.id)}
                                  className={`flex items-center mr-3 hover:text-white transition-colors
                                    ${hasLikedReply(comment.id, reply.id) ? 'text-neon-blue' : ''}`}
                                  disabled={hasLikedReply(comment.id, reply.id)}
                                >
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {reply.likes || 0}
                                </button>
                                
                                {canEditOrDelete(reply.userId) && (
                                  <button
                                    onClick={() => handleDeleteReply(comment.id, reply.id)}
                                    className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <Trash className="w-3 h-3 mr-1" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSystem;
