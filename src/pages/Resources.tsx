
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Search, Book, Download, Link as LinkIcon, Star, FileText, Code, Database, Layers } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { name: 'AI & ML', icon: <Database className="w-5 h-5" /> },
    { name: 'Web Development', icon: <Code className="w-5 h-5" /> },
    { name: 'UI/UX Design', icon: <Layers className="w-5 h-5" /> },
    { name: 'Books & PDFs', icon: <Book className="w-5 h-5" /> }
  ];
  
  const resources = [
    {
      title: 'Machine Learning Fundamentals',
      description: 'A comprehensive guide to machine learning concepts and applications.',
      type: 'PDF',
      category: 'AI & ML',
      link: '#'
    },
    {
      title: 'Web Development Roadmap 2023',
      description: 'The complete path to becoming a full-stack web developer.',
      type: 'Article',
      category: 'Web Development',
      link: '#'
    },
    {
      title: 'UI Design Principles',
      description: 'Essential principles for creating intuitive and beautiful user interfaces.',
      type: 'PDF',
      category: 'UI/UX Design',
      link: '#'
    },
    {
      title: 'The Future of AI',
      description: 'A research paper exploring the potential future developments in artificial intelligence.',
      type: 'PDF',
      category: 'AI & ML',
      link: '#'
    },
    {
      title: 'React Performance Optimization',
      description: 'Techniques to improve performance in React applications.',
      type: 'Article',
      category: 'Web Development',
      link: '#'
    },
    {
      title: 'Design Systems Guide',
      description: 'How to create and implement effective design systems.',
      type: 'PDF',
      category: 'UI/UX Design',
      link: '#'
    },
    {
      title: 'Data Science Handbook',
      description: 'A comprehensive reference for data science methods and tools.',
      type: 'Book',
      category: 'AI & ML',
      link: '#'
    },
    {
      title: 'JavaScript: The Good Parts',
      description: 'A classic book on JavaScript best practices.',
      type: 'Book',
      category: 'Web Development',
      link: '#'
    }
  ];

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconForType = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-neon-pink" />;
      case 'Article':
        return <LinkIcon className="w-5 h-5 text-neon-blue" />;
      case 'Book':
        return <Book className="w-5 h-5 text-neon-purple" />;
      default:
        return <Star className="w-5 h-5 text-neon-blue" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Resource <span className="text-white">Hub</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          A curated collection of AI, digital transformation, and futuristic tech resources. 
          Explore knowledge that powers the future!
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-black/40 border border-white/20 rounded-full 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
            />
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {categories.map((category, index) => (
            <GlassCard 
              key={index} 
              className="p-4 text-center cursor-pointer transition-all hover:transform hover:scale-105"
              glowColor={index % 2 === 0 ? 'cyan' : 'purple'}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center mb-2 border border-white/20">
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <GlassCard key={index} className="p-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-black/60 flex-shrink-0 flex items-center justify-center border border-white/20">
                  {getIconForType(resource.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold mb-1">{resource.title}</h3>
                    <span className="text-xs bg-black/40 border border-white/10 rounded-full px-2 py-0.5">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{resource.category}</span>
                    <GlowingButton 
                      color={resource.type === 'PDF' ? 'pink' : (resource.type === 'Book' ? 'purple' : 'cyan')} 
                      className="text-xs py-1"
                    >
                      <a href={resource.link} className="flex items-center">
                        {resource.type === 'PDF' || resource.type === 'Book' ? (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-3 h-3 mr-1" />
                            View
                          </>
                        )}
                      </a>
                    </GlowingButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
