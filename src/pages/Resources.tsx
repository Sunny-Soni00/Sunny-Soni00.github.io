
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Search, Book, Download, Link as LinkIcon, Star, FileText, Code, Database, Layers, Trash2, Edit, Plus } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Resource } from '../models/DataModels';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
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
    setIsEditing(true);
  };

  const handleAddResource = () => {
    setEditingResource({
      id: '',
      title: '',
      description: '',
      type: 'Article',
      category: 'Web Development',
      link: ''
    });
    setIsEditing(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingResource) return;
    
    try {
      if (editingResource.id) {
        // Update existing resource
        const updated = dataService.updateResource(editingResource.id, editingResource);
        if (updated) {
          setResources(resources.map(r => r.id === updated.id ? updated : r));
          toast.success('Resource updated successfully');
        }
      } else {
        // Add new resource
        const { id, ...resourceWithoutId } = editingResource;
        const newResource = dataService.addResource(resourceWithoutId);
        setResources([...resources, newResource]);
        toast.success('Resource added successfully');
      }
      
      setIsEditing(false);
      setEditingResource(null);
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
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
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea 
                    value={editingResource.description}
                    onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[100px]"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type *</label>
                    <select 
                      value={editingResource.type}
                      onChange={(e) => setEditingResource({...editingResource, type: e.target.value})}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      required
                    >
                      <option value="Article">Article</option>
                      <option value="PDF">PDF</option>
                      <option value="Book">Book</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select 
                      value={editingResource.category}
                      onChange={(e) => setEditingResource({...editingResource, category: e.target.value})}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                      focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                      required
                    >
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Link *</label>
                  <input 
                    type="text" 
                    value={editingResource.link}
                    onChange={(e) => setEditingResource({...editingResource, link: e.target.value})}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                    focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <GlowingButton 
                    type="button" 
                    color="cyan" 
                    className="text-sm"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingResource(null);
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
                  <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
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
                      >
                        <a href={resource.link} className="flex items-center" target="_blank" rel="noopener noreferrer">
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
    </Layout>
  );
};

export default Resources;
