const axios = require('axios');

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
  
