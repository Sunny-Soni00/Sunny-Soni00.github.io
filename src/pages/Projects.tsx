
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Code, ExternalLink, Github, Star, Filter, Edit, Trash2, Plus, Upload, File, FileText, Download, X, Film, Music, FileImage } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Project, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Projects = () => {
  const categories = ['All', 'AI', 'Web Dev', 'Data Science', 'UI/UX'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string>('');
  
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
      
      // Create and add preview URLs
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAttachmentPreviews(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just add a placeholder
          setAttachmentPreviews(prev => [...prev, '']);
        }
      });
    }
  };

  const handleProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      const file = files[0]; // Take only the first file
      setProjectImage(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProjectImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setAttachmentPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveProjectImage = () => {
    setProjectImage(null);
    setProjectImagePreview('');
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Film className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (file.type.includes('pdf')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleDeleteProject = (id: string) => {
    if (dataService.deleteProject(id)) {
      setProjects(prev => prev.filter(project => project.id !== id));
      toast.success('Project deleted successfully');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setAttachments([]);
    setAttachmentPreviews([]);
    setProjectImage(null);
    setProjectImagePreview('');
    if (project.image) {
      setProjectImagePreview(project.image);
    }
    setIsEditing(true);
    // Scroll to the top of the document when opening edit modal
    window.scrollTo(0, 0);
    // Prevent scrolling in the background
    document.body.style.overflow = 'hidden';
  };

  const handleAddProject = () => {
    setEditingProject({
      id: '',
      title: '',
      description: '',
      image: '',
      category: 'Web Dev',
      techStack: [],
      demoLink: '',
      repoLink: '',
      attachments: []
    });
    setAttachments([]);
    setAttachmentPreviews([]);
    setProjectImage(null);
    setProjectImagePreview('');
    setIsEditing(true);
    // Scroll to the top of the document when opening edit modal
    window.scrollTo(0, 0);
    // Prevent scrolling in the background
    document.body.style.overflow = 'hidden';
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProject(null);
    setAttachments([]);
    setAttachmentPreviews([]);
    setProjectImage(null);
    setProjectImagePreview('');
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProject) return;
    
    try {
      // Convert file attachments to attachment objects
      const newAttachments: Attachment[] = attachments.map((file, index) => ({
        id: Date.now() + index.toString(),
        name: file.name,
        url: file.type.startsWith('image/') ? attachmentPreviews[index] : URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'document'
      }));

      // Merge with existing attachments if updating
      const combinedAttachments = editingProject.id && editingProject.attachments 
        ? [...editingProject.attachments, ...newAttachments]
        : newAttachments;
      
      // Set the project image
      let projectImageUrl = editingProject.image;
      if (projectImage && projectImagePreview) {
        projectImageUrl = projectImagePreview;
        
        // Also add the project image as an attachment
        const imageAttachment: Attachment = {
          id: Date.now() + '-main-image',
          name: projectImage.name,
          url: projectImagePreview,
          type: 'image'
        };
        
        // Only add if it's a new image (not already in attachments)
        if (!combinedAttachments.some(att => att.url === projectImagePreview)) {
          combinedAttachments.push(imageAttachment);
        }
      }
      
      const projectToSave = {
        ...editingProject,
        image: projectImageUrl,
        attachments: combinedAttachments
      };
      
      if (editingProject.id) {
        // Update existing project
        const updated = dataService.updateProject(editingProject.id, projectToSave);
        if (updated) {
          setProjects(projects.map(p => p.id === updated.id ? updated : p));
          toast.success('Project updated successfully');
        }
      } else {
        // Add new project
        const { id, ...projectWithoutId } = projectToSave;
        const newProject = dataService.addProject(projectWithoutId);
        setProjects([...projects, newProject]);
        toast.success('Project added successfully');
      }
      
      setIsEditing(false);
      setEditingProject(null);
      setAttachments([]);
      setAttachmentPreviews([]);
      setProjectImage(null);
      setProjectImagePreview('');
      // Restore scrolling
      document.body.style.overflow = 'auto';
    } catch (error) {
      toast.error('Error saving project');
      console.error(error);
    }
  };

  const handleRemoveExistingAttachment = (attachmentId: string) => {
    if (!editingProject || !editingProject.id) return;
    
    if (editingProject.attachments) {
      const updatedAttachments = editingProject.attachments.filter(att => att.id !== attachmentId);
      setEditingProject({...editingProject, attachments: updatedAttachments});
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
            <div className="w-full max-w-3xl max-h-screen overflow-y-auto my-4">
              <GlassCard className="p-6">
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
                    <label className="block text-sm font-medium mb-1">Project Image *</label>
                    
                    {projectImagePreview ? (
                      <div className="relative mb-3 border border-white/20 rounded-md p-2 bg-black/40">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 rounded-md bg-black/40 overflow-hidden border border-white/20 flex items-center justify-center">
                            <FileImage className="w-8 h-8 text-neon-blue" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Project Thumbnail</p>
                            <p className="text-xs text-gray-400">This image will be used as the main project image</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={handleRemoveProjectImage}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <label className="cursor-pointer flex-1">
                          <div className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                          hover:border-neon-blue transition-all flex items-center justify-center">
                            <Upload className="w-4 h-4 mr-2" />
                            <span>Upload Thumbnail Image</span>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={handleProjectImageChange}
                          />
                        </label>
                      </div>
                    )}
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
                  
                  {/* Attachments Section */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Attachments (Optional)</label>
                    
                    {/* Current Attachments */}
                    {editingProject.attachments && editingProject.attachments.length > 0 && (
                      <div className="mb-3 max-h-40 overflow-y-auto p-2 border border-white/20 rounded-md">
                        <h4 className="text-xs font-medium mb-2 text-gray-400">Current Attachments</h4>
                        {editingProject.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center justify-between p-2 mb-1 bg-black/40 rounded">
                            <div className="flex items-center space-x-2">
                              {attachment.type === 'image' ? 
                                <FileImage className="w-4 h-4 text-neon-pink" /> : 
                                <FileText className="w-4 h-4 text-neon-blue" />
                              }
                              <span className="text-sm truncate max-w-[200px]">{attachment.name}</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveExistingAttachment(attachment.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* New Attachment Input */}
                    <div className="flex items-center space-x-3">
                      <label className="cursor-pointer">
                        <div className="px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                        hover:border-neon-blue transition-all flex items-center justify-center">
                          <Upload className="w-4 h-4 mr-2" />
                          <span>Add Files</span>
                        </div>
                        <input 
                          type="file" 
                          multiple
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    {/* Attachment Previews */}
                    {attachments.length > 0 && (
                      <div className="mt-3 max-h-40 overflow-y-auto p-2 border border-white/20 rounded-md">
                        <h4 className="text-xs font-medium mb-2 text-gray-400">New Attachments</h4>
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 mb-1 bg-black/40 rounded">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file)}
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveAttachment(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <GlowingButton 
                      type="button" 
                      color="cyan" 
                      className="text-sm"
                      onClick={handleCancelEdit}
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
                  <div className="h-48 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-900 border border-white/10">
                    {project.image ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage className="w-16 h-16 text-neon-blue opacity-70" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
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
                  
                  {/* Attachments Section */}
                  {project.attachments && project.attachments.length > 0 && (
                    <div className="mb-4 max-h-40 overflow-y-auto p-2 border border-white/20 rounded-md">
                      <h4 className="text-xs font-semibold mb-2 text-gray-300">Attachments</h4>
                      {project.attachments.map((attachment, idx) => (
                        <a 
                          key={idx}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={attachment.name}
                          className="flex items-center justify-between p-2 mb-1 last:mb-0 bg-black/40 rounded hover:bg-black/60"
                        >
                          <div className="flex items-center space-x-2">
                            {attachment.type === 'image' 
                              ? <FileImage className="w-4 h-4 text-neon-pink" /> 
                              : <FileText className="w-4 h-4 text-neon-blue" />
                            }
                            <span className="text-sm truncate max-w-[180px]">{attachment.name}</span>
                          </div>
                          <Download className="w-4 h-4 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  )}
                  
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
                    
                    {!project.demoLink && !project.repoLink && project.attachments?.length === 0 && (
                      <div className="text-sm text-gray-400 py-2 text-center w-full">
                        No external links or attachments available
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
