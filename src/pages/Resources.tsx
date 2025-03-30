
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import RecentActivity from '../components/RecentActivity';
import { 
  Book, Link as LinkIcon, Star, FileText, 
  Code, Database, Layers, Trash2, Edit, Plus, Upload, X, Image, File, Film, Music,
  MessageSquare, ArrowRight
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Resource, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { userRole } = useAuth();
  
  const categories = [
    { name: 'AI & ML', icon: <Database className="w-5 h-5" /> },
    { name: 'Web Development', icon: <Code className="w-5 h-5" /> },
    { name: 'UI/UX Design', icon: <Layers className="w-5 h-5" /> },
    { name: 'Books & PDFs', icon: <Book className="w-5 h-5" /> }
  ];

  useEffect(() => {
    // Load resources from data service
    const allResources = dataService.getAllResources();
    setResources(allResources);
    setFilteredResources(allResources);
  }, []);

  // Filter resources based on search term and selected category
  useEffect(() => {
    let filtered = resources;
    
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Show notification for search
      toast.info(`Showing results for: ${searchTerm}`);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedCategory]);

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

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setAttachmentPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Film className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (file.type.includes('pdf')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const handleRemoveExistingAttachment = (attachmentId: string) => {
    if (!editingResource || !editingResource.id) return;
    
    if (editingResource.attachments) {
      const updatedAttachments = editingResource.attachments.filter(att => att.id !== attachmentId);
      setEditingResource({...editingResource, attachments: updatedAttachments});
    }
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
  };

  const handleDeleteResource = (id: string) => {
    if (dataService.deleteResource(id)) {
      setResources(resources.filter(resource => resource.id !== id));
      toast.success('Resource deleted successfully');
    }
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setAttachments([]);
    setAttachmentPreviews([]);
    setIsEditing(true);
  };

  const handleAddResource = () => {
    setEditingResource({
      id: '',
      title: '',
      description: '',
      type: 'Article',
      category: 'Web Development',
      link: '',
      attachments: [],
      comments: [],
      likes: 0
    });
    setAttachments([]);
    setAttachmentPreviews([]);
    setIsEditing(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingResource) return;
    
    try {
      // Validate required fields
      if (!editingResource.title.trim()) {
        toast.error('Title is required');
        return;
      }
      
      // Convert file attachments to attachment objects
      const newAttachments: Attachment[] = attachments.map((file, index) => ({
        id: Date.now() + index.toString(),
        name: file.name,
        url: file.type.startsWith('image/') ? attachmentPreviews[index] : URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'document'
      }));

      // Merge with existing attachments if updating
      const combinedAttachments = editingResource.id && editingResource.attachments 
        ? [...editingResource.attachments, ...newAttachments]
        : newAttachments;
      
      const resourceToSave = {
        ...editingResource,
        attachments: combinedAttachments
      };
      
      if (editingResource.id) {
        // Update existing resource
        const updated = dataService.updateResource(editingResource.id, resourceToSave);
        if (updated) {
          setResources(resources.map(r => r.id === updated.id ? updated : r));
          toast.success('Resource updated successfully');
        }
      } else {
        // Add new resource
        const { id, ...resourceWithoutId } = resourceToSave;
        const newResource = dataService.addResource(resourceWithoutId);
        setResources([...resources, newResource]);
        toast.success('Resource added successfully');
      }
      
      setIsEditing(false);
      setEditingResource(null);
      setAttachments([]);
      setAttachmentPreviews([]);
    } catch (error) {
      toast.error('Error saving resource');
      console.error(error);
    }
  };
  
  const handleViewDetails = (resourceId: string) => {
    navigate(`/resources/${resourceId}`);
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

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {categories.map((category, index) => (
            <GlassCard 
              key={index} 
              className={`p-4 text-center cursor-pointer transition-all hover:transform hover:scale-105 ${
                selectedCategory === category.name ? 'border-neon-blue shadow-neon-glow' : ''
              }`}
              glowColor={index % 2 === 0 ? 'cyan' : 'purple'}
              onClick={() => handleCategoryClick(category.name)}
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
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3">
            {/* Admin Add Button */}
            {userRole === 'admin' && (
              <div className="flex justify-end mb-4">
                <GlowingButton color="purple" onClick={handleAddResource} className="flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Resource
                </GlowingButton>
              </div>
            )}
            
            {/* Search bar */}
            <div className="max-w-md mx-auto mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-4 bg-black/40 border border-white/20 rounded-full 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                />
              </form>
            </div>
            
            {/* Resources List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => (
                <GlassCard key={resource.id} className="p-5">
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
                      
                      {resource.description.length > 150 ? (
                        <p className="text-gray-300 text-sm mb-3">
                          {resource.description.substring(0, 150)}...
                        </p>
                      ) : (
                        <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                      )}
                      
                      {/* Image Preview (if available) */}
                      {resource.attachments && resource.attachments.find(a => a.type === 'image') && (
                        <div 
                          className="mb-3 cursor-pointer border border-white/10 rounded overflow-hidden aspect-video bg-black/40"
                          onClick={() => setShowImagePreview(resource.attachments?.find(a => a.type === 'image')?.url || null)}
                        >
                          <img 
                            src={resource.attachments.find(a => a.type === 'image')?.url} 
                            alt="Preview"
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs">Click to preview</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Attachment Count */}
                      {resource.attachments && resource.attachments.length > 0 && (
                        <div className="mb-3 text-xs text-gray-400">
                          {resource.attachments.length} attachment{resource.attachments.length !== 1 ? 's' : ''}
                          {resource.attachments.length > 0 && (
                            <span> ({resource.attachments.map(a => a.type).join(', ')})</span>
                          )}
                        </div>
                      )}
                      
                      {/* Comments Count */}
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {resource.comments?.length || 0} comment{(resource.comments?.length || 0) !== 1 ? 's' : ''}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{resource.category}</span>
                        <div className="flex space-x-2">
                          {userRole === 'admin' && (
                            <>
                              <button 
                                onClick={() => handleEditResource(resource)}
                                className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteResource(resource.id)}
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <GlowingButton 
                            color={resource.type === 'PDF' ? 'pink' : (resource.type === 'Book' ? 'purple' : 'cyan')} 
                            className="text-xs py-1"
                            onClick={() => handleViewDetails(resource.id)}
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            View Details
                          </GlowingButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
              
              {filteredResources.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-10">
                  <p className="text-gray-400 mb-2">No resources match your search criteria.</p>
                  {searchTerm && (
                    <GlowingButton onClick={() => setSearchTerm('')} className="text-sm">
                      Clear Search
                    </GlowingButton>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
      
      {/* Resource Edit Modal */}
      {isEditing && editingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto">
          <GlassCard className="w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              {editingResource.id ? 'Edit Resource' : 'Add New Resource'}
            </h2>
            
            <form onSubmit={handleSaveResource} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input 
                  type="text" 
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={editingResource.description}
                  onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[100px]"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select 
                    value={editingResource.type}
                    onChange={(e) => setEditingResource({...editingResource, type: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  >
                    <option value="Article">Article</option>
                    <option value="PDF">PDF</option>
                    <option value="Book">Book</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    value={editingResource.category}
                    onChange={(e) => setEditingResource({...editingResource, category: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
                <input 
                  type="text" 
                  value={editingResource.link}
                  onChange={(e) => setEditingResource({...editingResource, link: e.target.value})}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                />
              </div>
              
              {/* Attachments Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Attachments</label>
                
                {/* Current Attachments */}
                {editingResource.attachments && editingResource.attachments.length > 0 && (
                  <div className="mb-3 max-h-40 overflow-y-auto p-2 border border-white/20 rounded-md">
                    <h4 className="text-xs font-medium mb-2 text-gray-400">Current Attachments</h4>
                    {editingResource.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 mb-1 bg-black/40 rounded">
                        <div className="flex items-center space-x-2">
                          {attachment.type === 'image' ? <Image className="w-4 h-4 text-neon-pink" /> : <FileText className="w-4 h-4 text-neon-blue" />}
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
                  onClick={() => {
                    setIsEditing(false);
                    setEditingResource(null);
                    setAttachments([]);
                    setAttachmentPreviews([]);
                  }}
                >
                  Cancel
                </GlowingButton>
                <GlowingButton type="submit" className="text-sm">
                  Save Resource
                </GlowingButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setShowImagePreview(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={showImagePreview} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white"
              onClick={() => setShowImagePreview(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Resources;
