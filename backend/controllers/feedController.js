const fetchFeeds = require('../utils/fetchFeeds');

exports.getFeeds = async (req, res) => {
  try {
    const feeds = await fetchFeeds();
    res.json(feeds);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feeds' });
  }
};