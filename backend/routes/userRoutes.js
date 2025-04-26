const router = require('express').Router();
const { getMe, updateCredits } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/roleMiddleware');

router.get('/me', verifyToken, getMe);
router.put('/:id/credits', verifyToken, verifyAdmin, updateCredits);

module.exports = router;