
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import DynamicQuote from '../components/DynamicQuote';
import RecentActivity from '../components/RecentActivity';
import { 
  Rocket, Cpu, Code, LineChart, LucideIcon, 
  Brain, Database, Network, Layers, User, MessageSquare, 
  Star, BookOpen, ArrowRight, Github, Linkedin, Twitter, Mail
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, color }) => {
  return (
    <GlassCard className={`p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-${color}`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-black/60 border border-${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </GlassCard>
  );
};

const Home = () => {
  const features: FeatureProps[] = [
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
    },
    {
      icon: <Network className="w-6 h-6 text-neon-purple" />,
      title: 'Digital Transformation',
      description: 'Strategic guidance to navigate the evolving technological landscape.',
      color: 'neon-purple'
    },
    {
      icon: <Cpu className="w-6 h-6 text-neon-pink" />,
      title: 'IoT Solutions',
      description: 'Connected systems that bridge the digital and physical worlds.',
      color: 'neon-pink'
    }
  ];
  
  const stats = [
    { icon: <Star className="w-5 h-5 text-neon-blue" />, value: '15+', label: 'Projects Completed' },
    { icon: <MessageSquare className="w-5 h-5 text-neon-purple" />, value: '250+', label: 'Client Consultations' },
    { icon: <User className="w-5 h-5 text-neon-pink" />, value: '1000+', label: 'Happy Users' },
    { icon: <BookOpen className="w-5 h-5 text-neon-blue" />, value: '30+', label: 'Tech Resources' }
  ];
  
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: '#', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, url: '#', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, url: '#', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:example@example.com', label: 'Email' }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Cosmic</span> <span className="neon-text">Galaxy</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore the intersection of technology and creativity in this digital constellation of innovative projects and resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <GlowingButton as={Link} to="/projects" className="flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              Explore Projects
            </GlowingButton>
            <GlowingButton as={Link} to="/resources" color="pink" className="flex items-center">
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
      
      {/* Features Section */}
      <div className="bg-black/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="neon-text">Exploring</span> <span className="text-white">New Frontiers</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover a universe of technological possibilities, from artificial intelligence to immersive digital experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
          
          <div className="flex justify-center">
            <GlowingButton as={Link} to="/about" color="purple" className="flex items-center">
              <ArrowRight className="w-5 h-5 mr-2" />
              Learn More About My Work
            </GlowingButton>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GlassCard className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="neon-text">Let's</span> <span className="text-white">Connect</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Whether you're looking for a collaboration, have a project idea, or just want to chat about the latest in technology,
                  I'd love to hear from you. Connect with me through any of these platforms.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      className="flex items-center justify-center p-3 bg-black/40 border border-white/10 rounded-lg hover:border-neon-blue/70 hover:shadow-neon-glow transition-all"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </a>
                  ))}
                </div>
                
                <div className="text-center">
                  <GlowingButton as={Link} to="/reviews" className="flex items-center mx-auto">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Share Your Feedback
                  </GlowingButton>
                </div>
              </GlassCard>
            </div>
            
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
