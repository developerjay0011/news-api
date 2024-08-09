const express = require('express');
const router = express.Router();
const { addOrUpdatePrivacyPolicy, getPrivacyPolicy } = require('../controllers/privacyPolicyController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/add-or-update', authenticateToken,addOrUpdatePrivacyPolicy);
router.get('/', getPrivacyPolicy);

module.exports = router;
