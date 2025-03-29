
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { MessageSquare, Upload, Image, Send, Star, User, Trash2 } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Review } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Reviews = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const { userRole } = useAuth();
  
  useEffect(() => {
    // Load reviews from the data service
    setReviews(dataService.getAllReviews());
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !role.trim() || !message.trim() || rating === 0) {
      toast.error('Please fill all required fields and set a rating');
      return;
    }
    
    const newReview = dataService.addReview({
      name,
      role,
      message,
      rating,
      image: imagePreview || undefined
    });
    
    setReviews([...reviews, newReview]);
    toast.success('Thank you for your feedback!');
    
    // Reset form
    setName('');
    setEmail('');
    setRole('');
    setMessage('');
    setRating(0);
    setImagePreview(null);
  };
  
  const handleDeleteReview = (id: string) => {
    if (dataService.deleteReview(id)) {
      setReviews(reviews.filter(review => review.id !== id));
      toast.success('Review deleted successfully');
    }
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="md:col-span-2">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
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
                  <label className="block text-sm font-medium mb-2">Attach Image (Optional)</label>
                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer">
                      <div className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      hover:border-neon-blue transition-all flex items-center justify-center">
                        <Upload className="w-4 h-4 mr-2" />
                        <span>Choose File</span>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    
                    {imagePreview && (
                      <button 
                        type="button" 
                        onClick={handleRemoveImage}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-3 relative">
                      <div className="h-32 rounded-md overflow-hidden border border-white/20">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="h-full w-auto object-contain"
                        />
                      </div>
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
          
          {/* Recent Reviews */}
          <div className="md:col-span-1">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-neon-blue" />
                Recent Reviews
              </h2>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="glass-card p-4 transition-all hover:shadow-neon-glow relative">
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
                        {review.image ? (
                          <img src={review.image} alt={review.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-xs text-gray-400">{review.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">"{review.message}"</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-neon-blue' : 'text-gray-600'}`} 
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <p>No reviews yet. Be the first to leave feedback!</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
