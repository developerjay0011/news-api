const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const authenticateToken = require('../middleware/authMiddleware');
const { createNews, updateNews, deleteNews, setNewsStatus, getAllNews, getNonExpiredNews } = require('../controllers/newsController');

router.post('/create', authenticateToken, upload.single('image'), createNews);
router.put('/update', authenticateToken, upload.single('image'), updateNews);
router.delete('/delete/:id', authenticateToken, deleteNews);
router.put('/set-status', authenticateToken, setNewsStatus);
router.get('/get-all', getAllNews);
router.get('/non-expired', getNonExpiredNews);

module.exports = router;
