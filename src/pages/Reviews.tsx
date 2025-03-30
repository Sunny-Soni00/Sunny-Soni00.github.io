import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Star, Send, Trash2, Edit, Heart } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Review } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    message: '',
    rating: 5,
  });
  const { userDetails } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    setReviews(dataService.getAllReviews());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails && formData.name.trim() === '') {
      toast.error('Please enter your name');
      return;
    }
    
    if (formData.message.trim() === '') {
      toast.error('Please enter a message');
      return;
    }
    
    // Add the review with minimum required fields
    const newReview = {
      name: userDetails?.name || formData.name,
      role: formData.role || 'Visitor',
      message: formData.message,
      rating: formData.rating,
      date: new Date().toISOString(),
      image: userDetails?.profilePicture,
      attachments: [],
      userId: userDetails?.id
    };
    
    try {
      dataService.addReview(newReview);
      toast.success('Thank you for your review!');
      
      // Update the reviews list
      setReviews(dataService.getAllReviews());
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        message: '',
        rating: 5,
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 neon-text">
          What People <span className="text-white">Say</span>
        </h1>
        
        <div className="text-center mb-8">
          <GlowingButton onClick={toggleForm}>
            {showForm ? 'Hide Form' : 'Add a Review'}
          </GlowingButton>
        </div>
        
        {showForm && (
          <GlassCard className="p-6 mb-8">
            <form onSubmit={submitComment} className="space-y-4">
              {!userDetails && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-neon-blue focus:border-neon-blue sm:text-sm"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-neon-blue focus:border-neon-blue sm:text-sm"
                  placeholder={userDetails?.occupation || 'Visitor'}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-neon-blue focus:border-neon-blue sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Rating
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className={`text-yellow-500 hover:text-yellow-400 focus:outline-none ${
                        rating <= formData.rating ? '' : 'opacity-50'
                      }`}
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <GlowingButton type="submit">
                  Submit Review
                  <Send className="w-4 h-4 ml-2" />
                </GlowingButton>
              </div>
            </form>
          </GlassCard>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <GlassCard key={review.id} className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={review.image || 'https://via.placeholder.com/150'}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{review.message}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`w-4 h-4 ${rating <= review.rating ? 'text-yellow-500' : 'text-gray-500'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
