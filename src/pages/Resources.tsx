
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  Search, Book, Link as LinkIcon, Star, FileText, 
  Code, Database, Layers, Trash2, Edit, Plus, Upload, X, Image, File, Film, Music, MessageSquare, Eye, Download
} from 'lucide-react';
import { dataService } from '../services/DataService';
import { Resource, Attachment } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Resources = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  
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
    toast.info(`Searching for: ${searchTerm}`);
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
      attachments: []
    });
    setAttachments([]);
    setAttachmentPreviews([]);
    setIsEditing(true);
  };

  const handleViewResourceDetails = (resourceId: string) => {
    navigate(`/resources/${resourceId}`);
  };

  const handlePreviewImage = (imageUrl: string) => {
    setShowImagePreview(imageUrl);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingResource) return;
    
    if (!editingResource.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    try {
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
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-black/40 border border-white/20 rounded-full 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
            />
            <button type="submit" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Admin Add Button */}
        {userRole === 'admin' && (
          <div className="flex justify-end mb-4">
            <GlowingButton color="purple" onClick={handleAddResource} className="flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Resource
            </GlowingButton>
          </div>
        )}

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
                            onClick={() => {
                              if (editingResource.attachments) {
                                const updatedAttachments = editingResource.attachments.filter(att => att.id !== attachment.id);
                                setEditingResource({...editingResource, attachments: updatedAttachments});
                              }
                            }}
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
                        onChange={(e) => {
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
                        }}
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
                            {file.type.startsWith('image/') ? <Image className="w-4 h-4 text-neon-pink" /> : 
                             file.type.startsWith('video/') ? <Film className="w-4 h-4" /> :
                             file.type.startsWith('audio/') ? <Music className="w-4 h-4" /> :
                             <File className="w-4 h-4" />}
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              setAttachments(prev => prev.filter((_, i) => i !== index));
                              setAttachmentPreviews(prev => prev.filter((_, i) => i !== index));
                            }}
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

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{resource.description}</p>
                  
                  {/* Attachments Preview */}
                  {resource.attachments && resource.attachments.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-gray-300">Attachments</span>
                        <span className="text-xs bg-black/40 border border-white/10 rounded-full px-2 py-0.5">
                          {resource.attachments.length}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {resource.attachments.filter(att => att.type === 'image').slice(0, 3).map((attachment, idx) => (
                          <div 
                            key={idx}
                            className="w-14 h-14 flex-shrink-0 bg-black/40 rounded border border-white/10 overflow-hidden relative group"
                            onClick={() => handlePreviewImage(attachment.url)}
                          >
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-6 h-6 text-neon-blue" />
                            </div>
                            <img 
                              src={attachment.url} 
                              alt={attachment.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                        
                        {resource.attachments.length > 3 && (
                          <div className="w-14 h-14 flex-shrink-0 bg-black/40 rounded border border-white/10 flex items-center justify-center">
                            <span className="text-sm">+{resource.attachments.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Comments count */}
                  {resource.comments && resource.comments.length > 0 && (
                    <div className="flex items-center text-gray-400 mb-3 text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {resource.comments.length} comment{resource.comments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{resource.category}</span>
                    <div className="flex space-x-2">
                      {userRole === 'admin' && (
                        <>
                          <button 
                            onClick={() => handleEditResource(resource)}
                            className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                            title="Edit resource"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteResource(resource.id)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete resource"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <GlowingButton 
                        color="cyan" 
                        className="text-xs py-1"
                        onClick={() => handleViewResourceDetails(resource.id)}
                      >
                        <LinkIcon className="w-3 h-3 mr-1" />
                        View Details
                      </GlowingButton>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
          
          {filteredResources.length === 0 && (
            <div className="col-span-1 md:col-span-3 text-center py-10">
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
      
      {/* Image Preview Modal */}
      {showImagePreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowImagePreview(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img 
              src={showImagePreview} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-black/60 rounded-full p-2 text-white hover:text-neon-blue"
              onClick={(e) => {
                e.stopPropagation();
                const a = document.createElement('a');
                a.href = showImagePreview;
                a.download = 'image';
                a.click();
              }}
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Resources;
