const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const authenticateToken = require('../middleware/authMiddleware');
const { createTopic, updateTopic, deleteTopic, setTopicStatus, getAllTopics } = require('../controllers/topicController');

router.post('/create', authenticateToken, upload.single('image'), createTopic);
router.put('/update', authenticateToken, upload.single('image'), updateTopic);
router.delete('/delete/:id', authenticateToken, deleteTopic);
router.put('/set-status', authenticateToken, setTopicStatus);
router.get('/get-all', getAllTopics);
module.exports = router;
