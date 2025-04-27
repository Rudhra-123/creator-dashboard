`import React, { memo } from 'react';
import { ExternalLink, Share2, Bookmark, Flag, Clock } from 'lucide-react';

const FeedCard = memo(({ feed, onSave, onShare, onReport }) => {
  const { title, description, url, source, publishedAt, imageUrl } = feed;
  
  // Format the date if available
  const formattedDate = publishedAt ? 
    new Date(publishedAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) : null;
    
  // Truncate description if too long
  const truncatedDescription = description && description.length > 120 ? 
    `${description.substring(0, 120)}...` : description;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md mb-4">
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className={`p-5 flex flex-col justify-between ${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
          <div>
            <div className="flex items-center mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                {source}
              </span>
              {formattedDate && (
                <span className="flex items-center text-gray-500 text-xs ml-3">
                  <Clock size={12} className="mr-1" />
                  {formattedDate}
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {title}
            </h2>
            
            {truncatedDescription && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {truncatedDescription}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
            >
              Read more <ExternalLink size={16} className="ml-1" />
            </a>
            
            <div className="flex space-x-1">
              <button 
                onClick={() => onSave && onSave(feed)} 
                className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Save"
                title="Save"
              >
                <Bookmark size={18} />
              </button>
              
              <button
                onClick={() => onShare && onShare(feed)}
                className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                aria-label="Share"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              
              <button
                onClick={() => onReport && onReport(feed)}
                className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Report"
                title="Report"
              >
                <Flag size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// For better debugging (Dan Abramov practice)
FeedCard.displayName = 'FeedCard';



export default FeedCard;