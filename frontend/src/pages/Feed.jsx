import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FeedCard from '../components/FeedCard';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchFeeds = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError(null);
  
      // Fetching Reddit posts
      const reddit = await axios.get('https://www.reddit.com/r/programming/top.json?limit=5');
      const redditPosts = reddit.data.data.children.map(post => ({
        id: post.data.id,
        title: post.data.title,
        url: 'https://reddit.com' + post.data.permalink,
        source: 'Reddit',
      }));
  
      if (pageNumber === 1) {
        setFeeds(redditPosts);
        toast.success('Feeds refreshed successfully!');
      } else {
        setFeeds(prevFeeds => [...prevFeeds, ...redditPosts]);
        toast.success('More feeds loaded!');
      }
  
      setHasMore(true);  // Change this logic as per your requirements
      setPage(pageNumber);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load feeds');
      toast.error('Failed to fetch feeds!');
      console.error('Error fetching feeds:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleRefresh = () => {
    fetchFeeds(1);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchFeeds(page + 1);
    }
  };

  const handleManualFetch = () => {
    fetchFeeds(1);
  };

  useEffect(() => {
    fetchFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Feed</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleRefresh} 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800 transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-600 border-dashed rounded-full animate-spin"></div>
                Refreshing...
              </>
            ) : (
              'Refresh'
            )}
          </button>
          <button 
            onClick={handleManualFetch} 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
                Fetching...
              </>
            ) : (
              'Fetch Feeds'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && page === 1 ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : feeds.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No feeds found</h3>
          <p className="text-gray-500 mt-2">Subscribe to some feeds to get started</p>
          <a 
            href="/discover" 
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Discover Feeds
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {feeds.map(feed => (
            <FeedCard 
              key={feed.id || feed.url} 
              feed={feed} 
              onRefresh={handleRefresh}
            />
          ))}
          
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleLoadMore} 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-dashed rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
