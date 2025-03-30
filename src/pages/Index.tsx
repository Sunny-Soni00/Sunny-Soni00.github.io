
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import DynamicQuote from '../components/DynamicQuote';
import { 
  Rocket, Cpu, Code, LineChart, 
  Brain, Database, Network, Layers,
  Star, MessageSquare, ThumbsUp, FileText,
  ArrowRight, ArrowUpRight, Zap, Eye
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Project, Resource, Comment } from '../models/DataModels';

const Home = () => {
  const [topProjects, setTopProjects] = useState<Project[]>([]);
  const [topResources, setTopResources] = useState<Resource[]>([]);
  const [topComments, setTopComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = () => {
      try {
        // Get projects and sort by likes
        const projects = dataService.getAllProjects()
          .filter(p => p.likes && p.likes > 0)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 3);
        
        // Get resources and sort by likes
        const resources = dataService.getAllResources()
          .filter(r => r.likes && r.likes > 0)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 3);
        
        // Get top comments
        const comments = dataService.getAllComments()
          .filter(c => c.likes && c.likes > 0)
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3);
        
        setTopProjects(projects);
        setTopResources(resources);
        setTopComments(comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-neon-blue" />,
      title: 'AI Integration',
      description: 'Seamless AI solutions that enhance user experiences and automate complex tasks.',
      color: 'neon-blue'
    },
    {
      icon: <Code className="w-6 h-6 text-neon-purple" />,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies.',
      color: 'neon-purple'
    },
    {
      icon: <Layers className="w-6 h-6 text-neon-pink" />,
      title: 'UI/UX Design',
      description: 'Intuitive interfaces and engaging user experiences that inspire and delight.',
      color: 'neon-pink'
    },
    {
      icon: <Database className="w-6 h-6 text-neon-blue" />,
      title: 'Data Science',
      description: 'Transforming raw data into actionable insights and visualizations.',
      color: 'neon-blue'
    }
  ];
  
  const stats = [
    { icon: <Eye className="w-5 h-5 text-neon-blue" />, path: '/projects', label: 'Explore Projects' },
    { icon: <FileText className="w-5 h-5 text-neon-purple" />, path: '/resources', label: 'Discover Resources' },
    { icon: <MessageSquare className="w-5 h-5 text-neon-pink" />, path: '/reviews', label: 'Read Reviews' },
    { icon: <Zap className="w-5 h-5 text-neon-blue" />, path: '/about', label: 'Learn More' }
  ];
  
  // Helper function to get the project or resource for a comment
  const getCommentSource = (comment: Comment) => {
    if (comment.projectId) {
      const project = dataService.getProjectById(comment.projectId);
      return project ? { title: project.title, id: project.id, type: 'project' } : null;
    } else if (comment.resourceId) {
      const resource = dataService.getResourceById(comment.resourceId);
      return resource ? { title: resource.title, id: resource.id, type: 'resource' } : null;
    }
    return null;
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-left">
            <span className="text-white">Cosmic</span> <span className="neon-text">Galaxy</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-left">
            Explore innovative projects, valuable resources, and insights in this digital constellation.
          </p>
          <div className="flex flex-wrap gap-4">
            <GlowingButton to="/projects" className="flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              Explore Projects
            </GlowingButton>
            <GlowingButton to="/resources" color="pink" className="flex items-center">
              <LineChart className="w-5 h-5 mr-2" />
              Discover Resources
            </GlowingButton>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-neon-blue/20 rounded-full blur-3xl"></div>
            <GlassCard className="relative p-6 z-10">
              <DynamicQuote />
            </GlassCard>
          </div>
        </div>
      </div>
      
      {/* Top Projects Section */}
      {topProjects.length > 0 && (
        <div className="py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-left">
              <span className="neon-text">Top</span> <span className="text-white">Projects</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topProjects.map(project => (
                <GlassCard key={project.id} className="group overflow-hidden h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-lg text-white">{project.title}</h3>
                          <span className="text-xs bg-black/50 border border-white/20 rounded-full px-2 py-0.5">
                            {project.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3">
                          {project.description.length > 100 
                            ? `${project.description.substring(0, 100)}...` 
                            : project.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-neon-blue">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            <span>{project.likes || 0} likes</span>
                          </div>
                          
                          <GlowingButton 
                            to={`/projects/${project.id}`}
                            className="text-xs py-1 px-3"
                          >
                            View Details
                          </GlowingButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <GlowingButton to="/projects" className="inline-flex items-center">
                <ArrowRight className="w-5 h-5 mr-2" />
                View All Projects
              </GlowingButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="neon-text">Exploring</span> <span className="text-white">New Frontiers</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover a universe of technological possibilities, from artificial intelligence to immersive digital experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className={`p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-${feature.color}`}>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-black/60 border border-${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Resources Section */}
      {topResources.length > 0 && (
        <div className="py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-left">
              <span className="neon-text">Featured</span> <span className="text-white">Resources</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topResources.map(resource => (
                <GlassCard key={resource.id} className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs bg-black/60 border border-white/20 rounded-full">
                      {resource.type}
                    </span>
                    <span className="inline-block ml-2 px-3 py-1 text-xs bg-black/60 border border-white/20 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {resource.description.length > 120 
                      ? `${resource.description.substring(0, 120)}...` 
                      : resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-neon-pink">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{resource.likes || 0} likes</span>
                    </div>
                    
                    <GlowingButton 
                      to={`/resources/${resource.id}`}
                      color="pink"
                      className="text-xs py-1 px-3"
                    >
                      View Details
                    </GlowingButton>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <GlowingButton to="/resources" color="pink" className="inline-flex items-center">
                <ArrowRight className="w-5 h-5 mr-2" />
                View All Resources
              </GlowingButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Top Comments Section */}
      {topComments.length > 0 && (
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-left">
              <span className="neon-text">Community</span> <span className="text-white">Highlights</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topComments.map(comment => {
                const source = getCommentSource(comment);
                return source ? (
                  <GlassCard key={comment.id} className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-neon-blue/30 flex items-center justify-center mr-3">
                        <span className="text-lg font-bold">{comment.userName.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{comment.userName}</div>
                        <div className="text-xs text-gray-400">on {source.title}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-4">
                      {comment.text.length > 100 
                        ? `${comment.text.substring(0, 100)}...` 
                        : comment.text}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-neon-purple">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{comment.likes} likes</span>
                      </div>
                      
                      <GlowingButton 
                        to={`/${source.type}s/${source.id}`}
                        color="purple"
                        className="text-xs py-1 px-3 flex items-center"
                      >
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        View {source.type === 'project' ? 'Project' : 'Resource'}
                      </GlowingButton>
                    </div>
                  </GlassCard>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Stats/Navigation Section */}
      <div className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-white">Explore</span> <span className="neon-text">The Galaxy</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Link 
                key={index} 
                to={stat.path}
                className="group"
              >
                <GlassCard className="p-6 text-center h-full group-hover:border-neon-blue/70 group-hover:shadow-neon-glow transition-all">
                  <div className="flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-medium">{stat.label}</div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
