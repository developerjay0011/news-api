const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const topicRoutes = require('./topicRoutes');
const newsRoutes = require('./newsRoutes');
const teamConditionRoutes = require('./teamConditionRoutes');
const privacyPolicyRoutes = require('./privacyPolicyRoutes');

router.use('/admin', adminRoutes);
router.use('/topic', topicRoutes);
router.use('/news', newsRoutes);
router.use('/team-condition', teamConditionRoutes);
router.use('/privacy-policy', privacyPolicyRoutes);

module.exports = router;
