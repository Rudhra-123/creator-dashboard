const fetchFeeds = require('../utils/fetchFeeds');

exports.getFeeds = async (req, res) => {
  try {
    const feeds = await fetchFeeds();
    res.json(feeds);
  } catch (err) {
    console.error('Error fetching feeds:', err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch feeds' });
  }
};