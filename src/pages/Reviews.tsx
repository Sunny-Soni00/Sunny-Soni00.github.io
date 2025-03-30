
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import RecentActivity from '../components/RecentActivity';
import { 
  Star, User, Briefcase, Clock, MessageCircle, 
  Edit, Trash2, Heart, Image, X, Upload
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Review } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    name: '',
    role: '',
    message: '',
    rating: 5
  });
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { isAuthenticated, userDetails, userRole } = useAuth();
  
  useEffect(() => {
    // Load reviews
    const allReviews = dataService.getAllReviews();
    setReviews(allReviews);
    
    // Pre-fill user details if logged in
    if (isAuthenticated && userDetails) {
      setNewReview(prev => ({
        ...prev,
        name: userDetails.name,
        role: userDetails.occupation || ''
      }));
    }
  }, [isAuthenticated, userDetails]);
  
  const resetForm = () => {
    setNewReview({
      name: isAuthenticated && userDetails ? userDetails.name : '',
      role: isAuthenticated && userDetails ? userDetails.occupation || '' : '',
      message: '',
      rating: 5
    });
    setReviewImage(null);
    setImagePreview(null);
  };
  
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name) {
      toast.error('Please provide your name');
      return;
    }
    
    // Create attachments array if image was uploaded
    const attachments = reviewImage && imagePreview ? [{
      id: Date.now().toString(),
      name: reviewImage.name,
      url: imagePreview,
      type: 'image'
    }] : undefined;
    
    // Add the review
    const createdReview = dataService.addReview({
      ...newReview as Omit<Review, 'id' | 'date' | 'likes'>,
      attachments,
      userId: userDetails?.id
    });
    
    if (createdReview) {
      setReviews([...reviews, createdReview]);
      setShowAddReview(false);
      resetForm();
      toast.success('Review submitted successfully');
      
      // Record activity if logged in
      if (isAuthenticated && userDetails) {
        dataService.addUserActivity(userDetails.id, {
          type: 'review',
          details: 'Submitted a review',
        });
      }
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    
    if (file) {
      setReviewImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setReviewImage(null);
    setImagePreview(null);
  };
  
  const handleDeleteReview = (id: string) => {
    if (dataService.deleteReview(id)) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.success('Review deleted successfully');
    }
  };
  
  const handleLikeReview = (id: string) => {
    if (dataService.likeReview(id)) {
      setReviews(reviews.map(review => 
        review.id === id 
          ? { ...review, likes: (review.likes || 0) + 1 } 
          : review
      ));
      
      // Record activity if logged in
      if (isAuthenticated && userDetails) {
        dataService.addUserActivity(userDetails.id, {
          type: 'like',
          details: 'Liked a review',
        });
      }
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          User <span className="text-white">Reviews</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          Discover what others are saying about their cosmic experience and share your own feedback.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-8 flex justify-end">
              <GlowingButton 
                onClick={() => {
                  resetForm();
                  setShowAddReview(true);
                }}
                className="flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Share Your Experience
              </GlowingButton>
            </div>
            
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map(review => (
                  <GlassCard key={review.id} className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {review.image ? (
                          <img 
                            src={review.image} 
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border border-white/20" 
                          />
                        ) : review.attachments && review.attachments[0]?.type === 'image' ? (
                          <img 
                            src={review.attachments[0].url} 
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border border-white/20" 
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
                            <User className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-bold">{review.name}</h3>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400 mb-2">
                          <Briefcase className="w-3 h-3 mr-1" />
                          <span>{review.role || 'User'}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{review.date}</span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3">{review.message}</p>
                        
                        {/* Display attached image if any */}
                        {review.attachments && review.attachments[0]?.type === 'image' && (
                          <div className="mb-3 border border-white/10 rounded overflow-hidden">
                            <img 
                              src={review.attachments[0].url} 
                              alt="Review attachment"
                              className="w-full h-auto object-cover" 
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => handleLikeReview(review.id)}
                            className="flex items-center text-gray-400 hover:text-neon-pink transition-colors"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="text-xs">{review.likes || 0}</span>
                          </button>
                          
                          {(userRole === 'admin' || (isAuthenticated && userDetails?.id === review.userId)) && (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleDeleteReview(review.id)}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                  <MessageCircle className="w-full h-full" />
                </div>
                <p className="text-gray-400 mb-3">No reviews yet. Be the first to share your experience!</p>
                <GlowingButton 
                  onClick={() => {
                    resetForm();
                    setShowAddReview(true);
                  }}
                >
                  Write a Review
                </GlowingButton>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
      
      {/* Add Review Modal */}
      {showAddReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <GlassCard className="w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Share Your Experience</h2>
            
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input 
                  type="text" 
                  value={newReview.name || ''}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Role/Occupation</label>
                <input 
                  type="text" 
                  value={newReview.role || ''}
                  onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Your Message</label>
                <textarea 
                  value={newReview.message || ''}
                  onChange={(e) => setNewReview({...newReview, message: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[120px]"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button 
                      key={i}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: i + 1})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 ${i < (newReview.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative mb-3 w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button" 
                      className="absolute top-0 right-0 p-1 bg-black/70 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label className="cursor-pointer">
                      <div className="px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      hover:border-neon-blue transition-all inline-flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        <span>Choose Image</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <GlowingButton 
                  type="button" 
                  color="cyan" 
                  className="text-sm"
                  onClick={() => setShowAddReview(false)}
                >
                  Cancel
                </GlowingButton>
                <GlowingButton type="submit" className="text-sm">
                  Submit Review
                </GlowingButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </Layout>
  );
};

export default Reviews;
