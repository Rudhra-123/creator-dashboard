const axios = require('axios');

module.exports = async function fetchFeeds() {
  const reddit = await axios.get('https://www.reddit.com/r/programming/top.json?limit=5');
  const posts = reddit.data.data.children.map(post => ({
    title: post.data.title,
    url: 'https://reddit.com' + post.data.permalink,
    source: 'Reddit',
  }));

  return posts;
};