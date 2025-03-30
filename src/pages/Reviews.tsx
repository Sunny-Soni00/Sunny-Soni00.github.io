
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { MessageSquare, Upload, Send, Star, User, Trash2, File, FileText, Film, Music, Download, Edit, Check, FileImage, Eye, X } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Review, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Reviews = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { userRole, userDetails, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Load reviews from the data service
    setReviews(dataService.getAllReviews());
    
    // Pre-fill name and email if user details exist
    if (userDetails) {
      setName(userDetails.name || '');
      if (userDetails.occupation) {
        setRole(userDetails.occupation);
      }
    }
  }, [userDetails]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
      
      // Create and add preview URLs
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAttachmentPreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just add a placeholder
          setAttachmentPreviews(prev => [...prev, '']);
        }
      });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setAttachmentPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Film className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (file.type.includes('pdf')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleStartEditReview = (review: Review) => {
    // Only allow editing of the user's own reviews
    if (userDetails && review.userId === userDetails.id) {
      setEditingReviewId(review.id);
      setEditMessage(review.message);
    } else {
      toast.error("You can only edit your own reviews");
    }
  };

  const handleCancelEditReview = () => {
    setEditingReviewId(null);
    setEditMessage('');
  };

  const handleSaveEditReview = (reviewId: string) => {
    if (editMessage.trim() === '') {
      toast.error('Review message cannot be empty');
      return;
    }

    const updatedReview = dataService.updateReview(reviewId, { message: editMessage });
    if (updatedReview) {
      setReviews(reviews.map(review => review.id === reviewId ? updatedReview : review));
      toast.success('Review updated successfully');
      setEditingReviewId(null);
      setEditMessage('');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign up or login to submit a review');
      return;
    }
    
    if (!name.trim() || !role.trim() || !message.trim() || rating === 0) {
      toast.error('Please fill all required fields and set a rating');
      return;
    }
    
    // Convert file attachments to attachment objects
    const newAttachments: Attachment[] = attachments.map((file, index) => ({
      id: Date.now() + index.toString(),
      name: file.name,
      url: file.type.startsWith('image/') ? attachmentPreviews[index] : URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'document'
    }));
    
    const newReview = dataService.addReview({
      name,
      role,
      message,
      rating,
      attachments: newAttachments,
      userId: userDetails?.id
    });
    
    setReviews([...reviews, newReview]);
    toast.success('Thank you for your feedback!');
    
    // Reset form
    setRole('');
    setMessage('');
    setRating(0);
    setAttachments([]);
    setAttachmentPreviews([]);
  };
  
  const handleDeleteReview = (id: string) => {
    if (dataService.deleteReview(id)) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.success('Review deleted successfully');
    }
  };
  
  const openImagePreview = (url: string) => {
    setPreviewImage(url);
  };
  
  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Feedback <span className="text-white">& Reviews</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Your thoughts and insights help shape the future of the Cosmic Dreamscape. 
          Share your feedback!
        </p>

        {/* Reviews Section - Now highlighted at the top */}
        <GlassCard className="p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-neon-blue" />
            Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2">
            {reviews.map((review) => (
              <div key={review.id} className="glass-card p-5 transition-all hover:shadow-neon-glow relative">
                {(userRole === 'admin' || (userDetails && userDetails.id === review.userId)) && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {userDetails && userDetails.id === review.userId && editingReviewId !== review.id && (
                      <button 
                        onClick={() => handleStartEditReview(review)}
                        className="text-neon-blue hover:text-neon-purple transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-neon-blue/30 text-white">
                      {review.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? 'text-neon-blue' : 'text-gray-600'}`} 
                      fill={i < review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                
                {editingReviewId === review.id ? (
                  <div className="mb-3">
                    <textarea 
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[80px] text-sm"
                    ></textarea>
                    <div className="flex justify-end space-x-2 mt-2">
                      <button 
                        onClick={handleCancelEditReview}
                        className="text-xs px-2 py-1 bg-black/50 border border-white/20 rounded hover:border-red-400"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleSaveEditReview(review.id)}
                        className="text-xs px-2 py-1 bg-black/50 border border-neon-blue rounded hover:bg-neon-blue/20 flex items-center"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-300 mb-4">"{review.message}"</p>
                )}
                
                {/* Attachments Display */}
                {review.attachments && review.attachments.length > 0 && (
                  <div className="mb-3 max-h-40 overflow-y-auto p-2 border border-white/20 rounded-md">
                    {review.attachments.map((attachment, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        <div className="flex items-center p-2 bg-black/40 rounded group hover:bg-black/60 transition-colors">
                          {attachment.type === 'image' ? 
                            <FileImage className="w-4 h-4 mr-2 text-neon-pink" /> : 
                            <FileText className="w-4 h-4 mr-2 text-neon-blue" />
                          }
                          <span className="text-sm truncate flex-1">{attachment.name}</span>
                          <div className="flex space-x-1">
                            {attachment.type === 'image' && (
                              <button
                                onClick={() => openImagePreview(attachment.url)}
                                className="p-1 rounded hover:bg-white/10"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4 text-neon-blue" />
                              </button>
                            )}
                            <a 
                              href={attachment.url}
                              download={attachment.name}
                              className="p-1 rounded hover:bg-white/10"
                              title="Download"
                            >
                              <Download className="w-4 h-4 text-neon-pink" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-1 md:col-span-3 text-center py-6 text-gray-400">
                <p>No reviews yet. Be the first to leave feedback!</p>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Feedback Form */}
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-neon-blue" />
            Send Your Feedback
          </h2>
          
          <form className="space-y-4" onSubmit={handleSubmitReview}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={!!userDetails}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Your Role/Profession *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="e.g. Web Developer, Designer, Student..."
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rating *</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${rating >= star ? 'text-neon-blue' : 'text-gray-400'} hover:text-neon-blue transition-colors`}
                    onClick={() => setRating(star)}
                  >
                    <Star className="w-6 h-6" fill={rating >= star ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Your Feedback *</label>
              <textarea 
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[120px]"
                placeholder="Share your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Attach Files (Optional)</label>
              <div className="flex items-center space-x-3">
                <label className="cursor-pointer">
                  <div className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  hover:border-neon-blue transition-all flex items-center justify-center">
                    <Upload className="w-4 h-4 mr-2" />
                    <span>Choose Files</span>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-3 max-h-48 overflow-y-auto p-2 border border-white/20 rounded-md">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 mb-2 bg-black/40 rounded">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file)}
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveAttachment(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <GlowingButton className="flex items-center" type="submit">
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </GlowingButton>
            </div>
          </form>
        </GlassCard>
      </div>
      
      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={closeImagePreview}
        >
          <div 
            className="max-w-4xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-neon-glow"
            />
            <button 
              onClick={closeImagePreview}
              className="absolute top-4 right-4 text-white hover:text-neon-blue bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <a 
              href={previewImage}
              download
              className="absolute bottom-4 right-4 text-white hover:text-neon-blue bg-black/50 rounded-full p-2"
            >
              <Download className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Reviews;
