
import React from 'react';
import { FileIcon, FileText, FileImage, File } from 'lucide-react';
import ImagePreview from './ImagePreview';

interface FilePreviewProps {
  url: string;
  name: string;
  type: string;
  previewMode?: 'icon' | 'thumbnail';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ 
  url, 
  name, 
  type, 
  previewMode = 'thumbnail',
  size = 'md',
  onClick 
}) => {
  const isImage = type === 'image';
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const containerSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (isImage) {
      // Do nothing, let the ImagePreview handle it
    } else {
      window.open(url, '_blank');
    }
  };
  
  // Icon-only mode
  if (previewMode === 'icon') {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center px-3 py-1.5 bg-black/40 border border-white/20 rounded text-sm hover:bg-black/60 hover:border-neon-blue/70 transition-colors"
        title={name}
      >
        {isImage ? (
          <FileImage className={`mr-2 ${iconSizes[size]}`} />
        ) : (
          <FileText className={`mr-2 ${iconSizes[size]}`} />
        )}
        <span className="truncate max-w-[150px]">{name}</span>
      </button>
    );
  }
  
  // Thumbnail mode
  if (isImage) {
    return <ImagePreview src={url} alt={name} className={containerSizes[size]} />;
  }
  
  // File icon for non-images
  return (
    <button
      onClick={handleClick}
      className={`${containerSizes[size]} flex flex-col items-center justify-center bg-black/40 border border-white/20 rounded p-1 hover:bg-black/60 hover:border-neon-blue/70 transition-colors`}
      title={name}
    >
      <FileText className={iconSizes[size]} />
      <span className="text-xs truncate w-full text-center mt-1">
        {name.length > 10 ? `${name.slice(0, 7)}...` : name}
      </span>
    </button>
  );
};

export default FilePreview;
