
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import RecentActivity from '../components/RecentActivity';
import { 
  Brain, Code, PaintBucket, Database, Filter, 
  Plus, ExternalLink, Github, ArrowRight, MessageSquare
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Project } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  
  useEffect(() => {
    const loadedProjects = dataService.getAllProjects();
    setProjects(loadedProjects);
    setFilteredProjects(loadedProjects);
  }, []);
  
  const handleFilter = (category: string | null) => {
    setActiveFilter(category);
    
    if (category) {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  };
  
  const handleViewDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };
  
  const categories = [
    { name: 'All', icon: <Filter className="w-5 h-5" /> },
    { name: 'AI', icon: <Brain className="w-5 h-5" /> },
    { name: 'Web Dev', icon: <Code className="w-5 h-5" /> },
    { name: 'UI/UX', icon: <PaintBucket className="w-5 h-5" /> },
    { name: 'Data Science', icon: <Database className="w-5 h-5" /> }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Project <span className="text-white">Showcase</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
          Explore innovative solutions and creative implementations across various domains and technologies.
        </p>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilter(category.name === 'All' ? null : category.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                (category.name === 'All' && activeFilter === null) || category.name === activeFilter
                  ? 'bg-black/60 border border-neon-blue/70 shadow-neon-glow'
                  : 'bg-black/40 border border-white/10 hover:border-white/30'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
        
        {userRole === 'admin' && (
          <div className="flex justify-end mb-6">
            <GlowingButton 
              color="purple" 
              onClick={() => navigate('/admin')}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </GlowingButton>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <GlassCard
                  key={project.id}
                  className="group overflow-hidden"
                >
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
                        
                        {project.description.length > 120 ? (
                          <p className="text-gray-300 text-sm mb-3">
                            {project.description.substring(0, 120)}...
                          </p>
                        ) : (
                          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                        )}
                        
                        {/* Technology tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-black/50 border border-white/10 rounded-full px-2 py-0.5"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="text-xs text-gray-400">+{project.techStack.length - 3} more</span>
                          )}
                        </div>
                        
                        {/* Comments count */}
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {project.comments?.length || 0} comment{(project.comments?.length || 0) !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                          <GlowingButton 
                            color="cyan" 
                            className="text-xs py-1"
                            onClick={() => handleViewDetails(project.id)}
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            View Details
                          </GlowingButton>
                          
                          {project.demoLink && (
                            <GlowingButton color="pink" className="text-xs py-1">
                              <a href={project.demoLink} className="flex items-center" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Demo
                              </a>
                            </GlowingButton>
                          )}
                          
                          {project.repoLink && (
                            <GlowingButton color="purple" className="text-xs py-1">
                              <a href={project.repoLink} className="flex items-center" target="_blank" rel="noopener noreferrer">
                                <Github className="w-3 h-3 mr-1" />
                                Repo
                              </a>
                            </GlowingButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
              
              {filteredProjects.length === 0 && (
                <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 mb-4 opacity-30">
                    <Filter className="w-full h-full" />
                  </div>
                  <p className="text-gray-400 mb-2">No projects found in this category</p>
                  <GlowingButton
                    onClick={() => handleFilter(null)}
                    className="mt-3"
                  >
                    View All Projects
                  </GlowingButton>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
