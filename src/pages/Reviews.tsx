
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { MessageSquare, Upload, Image, Send, Star, User } from 'lucide-react';

const Reviews = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'UX Designer',
      message: 'The cosmic interface is truly revolutionary. The attention to detail in the UI elements creates an immersive experience that feels both futuristic and intuitive.',
      rating: 5,
      date: '2 weeks ago'
    },
    {
      name: 'Sarah Johnson',
      role: 'Web Developer',
      message: 'I\'ve been looking for resources on AI integration, and this site delivered beyond expectation. The project showcase is particularly inspiring!',
      rating: 4,
      date: '1 month ago'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Scientist',
      message: 'As someone in the field of data visualization, I appreciate the creative approach to displaying complex information. The cosmic theme complements the technical content perfectly.',
      rating: 5,
      date: '3 months ago'
    }
  ];

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
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-400 hover:text-neon-blue transition-colors"
                      >
                        <Star className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Your Feedback</label>
                  <textarea 
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[120px]"
                    placeholder="Share your thoughts..."
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
                  <GlowingButton className="flex items-center">
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
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="glass-card p-4 transition-all hover:shadow-neon-glow">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
                        <User className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-xs text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">"{testimonial.message}"</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-neon-blue' : 'text-gray-600'}`} 
                            fill={i < testimonial.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{testimonial.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
