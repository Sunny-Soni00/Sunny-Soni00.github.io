
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Code, ExternalLink, Github, Star, Filter, Edit, Trash2, Plus, Link, Paperclip } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Project } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Projects = () => {
  const categories = ['All', 'AI', 'Web Dev', 'Data Science', 'UI/UX'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const { userRole } = useAuth();
  
  useEffect(() => {
    // Load projects from data service
    const allProjects = dataService.getAllProjects();
    setProjects(allProjects);
  }, []);
  
  // Filter projects whenever active category or projects change
  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    setFilteredProjects(filtered);
  }, [activeCategory, projects]);

  const handleDeleteProject = (id: string) => {
    if (dataService.deleteProject(id)) {
      setProjects(prev => prev.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleAddProject = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'Web Dev',
      techStack: [],
      demoLink: '',
      repoLink: '',
      attachmentUrl: ''
    });
    setIsEditing(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProject) return;
    
    try {
      if (editingProject.id) {
        // Update existing project
        const updated = dataService.updateProject(editingProject.id, editingProject);
        if (updated) {
          setProjects(projects.map(p => p.id === updated.id ? updated : p));
          toast.success('Project updated successfully');
        }
      } else {
        // Add new project
        const { id, ...projectWithoutId } = editingProject;
        const newProject = dataService.addProject(projectWithoutId);
        setProjects([...projects, newProject]);
        toast.success('Project added successfully');
      }
      
      setIsEditing(false);
      setEditingProject(null);
    } catch (error) {
      toast.error('Error saving project');
      console.error(error);
    }
  };

  // Handle tech stack inputs (comma-separated)
  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    
    const techString = e.target.value;
    const techArray = techString.split(',').map(item => item.trim()).filter(Boolean);
    
    setEditingProject({...editingProject, techStack: techArray});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Projects <span className="text-white">Gallery</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Projects in this section are built using a sprint-based learning approach. 
          Explore the innovations and digital experiments conducted here!
        </p>

        {/* Admin Add Button */}
        {userRole === 'admin' && (
          <div className="flex justify-end mb-4">
            <GlowingButton color="purple" onClick={handleAddProject} className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </GlowingButton>
          </div>
        )}

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category 
                  ? 'bg-neon-blue/20 border border-neon-blue text-white shadow-neon-glow' 
                  : 'bg-black/40 border border-white/20 text-gray-300 hover:border-neon-blue/50'
              }`}
            >
              {category === 'All' && <Filter className="inline w-4 h-4 mr-1" />}
              {category}
            </button>
          ))}
        </div>

        {/* Project Edit Modal */}
        {isEditing && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto">
            <GlassCard className="w-full max-w-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input 
                    type="text" 
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea 
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[100px]"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL *</label>
                  <input 
                    type="text" 
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Attachment URL (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={editingProject.attachmentUrl || ''}
                    onChange={(e) => setEditingProject({...editingProject, attachmentUrl: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    placeholder="URL to project file or additional resource"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select 
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    required
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tech Stack * (comma-separated)</label>
                  <input 
                    type="text" 
                    value={editingProject.techStack.join(', ')}
                    onChange={handleTechStackChange}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Demo Link (Optional)</label>
                    <input 
                      type="text" 
                      value={editingProject.demoLink || ''}
                      onChange={(e) => setEditingProject({...editingProject, demoLink: e.target.value})}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      placeholder="Live demo URL"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Repository Link (Optional)</label>
                    <input 
                      type="text" 
                      value={editingProject.repoLink || ''}
                      onChange={(e) => setEditingProject({...editingProject, repoLink: e.target.value})}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      placeholder="GitHub repo URL"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <GlowingButton 
                    type="button" 
                    color="cyan" 
                    className="text-sm"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingProject(null);
                    }}
                  >
                    Cancel
                  </GlowingButton>
                  <GlowingButton type="submit" className="text-sm">
                    Save Project
                  </GlowingButton>
                </div>
              </form>
            </GlassCard>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group">
              <GlassCard className="h-full overflow-hidden transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="p-4 relative">
                  {userRole === 'admin' && (
                    <div className="absolute top-2 left-2 flex space-x-1 z-10">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-gray-300 hover:text-neon-blue"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-gray-300 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full px-3 py-1 text-xs border border-white/10">
                    {project.category}
                  </div>
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-neon-blue inline-flex flex-shrink-0" />
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs bg-black/40 border border-white/10 rounded-full px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.demoLink && (
                      <GlowingButton color="cyan" className="text-sm flex-1 py-1.5">
                        <a href={project.demoLink} className="flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </GlowingButton>
                    )}
                    
                    {project.repoLink && (
                      <GlowingButton color="purple" className="text-sm flex-1 py-1.5">
                        <a href={project.repoLink} className="flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </GlowingButton>
                    )}
                    
                    {project.attachmentUrl && (
                      <GlowingButton color="pink" className="text-sm flex-1 py-1.5">
                        <a href={project.attachmentUrl} className="flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                          <Paperclip className="w-4 h-4 mr-1" />
                          Attachment
                        </a>
                      </GlowingButton>
                    )}
                    
                    {!project.demoLink && !project.repoLink && !project.attachmentUrl && (
                      <div className="text-sm text-gray-400 py-2 text-center w-full">
                        No external links available
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-1 md:col-span-3 text-center py-10">
              <p className="text-gray-400 mb-2">No projects found in this category.</p>
              {activeCategory !== 'All' && (
                <GlowingButton onClick={() => setActiveCategory('All')} className="text-sm">
                  Show All Projects
                </GlowingButton>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
