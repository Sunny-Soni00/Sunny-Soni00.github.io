
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { dataService } from '../services/DataService';
import { Resource } from '../models/DataModels';

interface ResourceSearchProps {
  onResourceSelect: (resourceId: string) => void;
}

const ResourceSearch: React.FC<ResourceSearchProps> = ({ onResourceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Resource[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fetch all resources
    const allResources = dataService.getAllResources();
    setResources(allResources);
  }, []);
  
  useEffect(() => {
    // Filter resources based on search term
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filtered = resources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
  }, [searchTerm, resources]);
  
  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSuggestionClick = (resourceId: string) => {
    onResourceSelect(resourceId);
    setShowSuggestions(false);
    setSearchTerm('');
  };
  
  return (
    <div className="relative" ref={suggestionsRef}>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search resources..." 
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          className="pl-9 pr-3 py-2 w-full bg-black/40 border border-white/10 rounded-full text-sm focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white"
        />
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4">
          <Search className="h-4 w-4" />
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-black/90 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map(resource => (
            <div 
              key={resource.id}
              className="px-4 py-2 hover:bg-neon-blue/20 cursor-pointer transition-colors"
              onClick={() => handleSuggestionClick(resource.id)}
            >
              <div className="font-medium">{resource.title}</div>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>{resource.category}</span>
                <span>{resource.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceSearch;
