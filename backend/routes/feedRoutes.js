const axios = require("axios");

exports.getFeeds = async (req, res) => {
  try {
    // Fetch Reddit feeds
    const reddit = await axios.get("https://www.reddit.com/r/programming/top.json?limit=10");

    // Fetch Quotes (Twitter alternative demo)
    const twitter = await axios.get("https://api.quotable.io/quotes?limit=10");

    const posts = [
      ...reddit.data.data.children.map(p => ({
        title: p.data.title,
        url: `https://reddit.com${p.data.permalink}`,
        source: "Reddit"
      })),
      ...twitter.data.results.map(p => ({
        title: p.content,
        url: "#",
        source: "Quote API"
      }))
    ];

    res.json(posts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch feeds" });
  }
};
