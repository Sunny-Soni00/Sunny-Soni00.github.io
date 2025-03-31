import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/DataService';
import { Review } from '../models/DataModels';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

const Reviews = () => {
  const { addComment } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddReview = () => {
    if (name && role && message && rating > 0) {
      addComment({
        text: message,
        userName: name,
        projectId: undefined,
        resourceId: undefined,
      }, false);
    
      setName('');
      setRole('');
      setMessage('');
      setRating(5);
      toast.success("Review added successfully!");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <GlassCard className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Add a Review</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black/50 border-white/20 leading-tight focus:shadow-neon-glow focus:border-neon-blue focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Role:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your Role"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black/50 border-white/20 leading-tight focus:shadow-neon-glow focus:border-neon-blue focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Review"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black/50 border-white/20 leading-tight focus:shadow-neon-glow focus:border-neon-blue focus:outline-none transition-all"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Rating:</label>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`text-2xl ${index < rating ? 'text-neon-yellow' : 'text-gray-500'} focus:outline-none`}
                  >
                    <Star />
                  </button>
                ))}
              </div>
            </div>
            <GlowingButton onClick={handleAddReview}>Add Review</GlowingButton>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default Reviews;
