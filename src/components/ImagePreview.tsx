
import React, { useState } from 'react';
import { X, Maximize, Download } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const closePreview = () => {
    setIsExpanded(false);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const a = document.createElement('a');
    a.href = src;
    a.download = alt || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <>
      <div 
        className={`relative cursor-pointer transition-transform ${className}`}
        onClick={toggleExpand}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
          <button 
            className="p-1 bg-black/70 rounded-full text-white"
            onClick={toggleExpand}
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closePreview}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            <button 
              className="absolute top-2 right-2 p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
              onClick={closePreview}
            >
              <X className="w-5 h-5" />
            </button>
            
            <button 
              className="absolute bottom-2 right-2 p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
