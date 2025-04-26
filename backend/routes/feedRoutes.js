const router = require('express').Router();
const { getFeeds } = require('../controllers/feedController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getFeeds);

module.exports = router;