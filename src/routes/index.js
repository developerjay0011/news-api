const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const topicRoutes = require('./topicRoutes');
const newTypeRoutes = require('./newTypeRoutes');

const newsRoutes = require('./newsRoutes');
const teamConditionRoutes = require('./teamConditionRoutes');
const privacyPolicyRoutes = require('./privacyPolicyRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/admin', adminRoutes);
router.use('/topic', topicRoutes);
router.use('/type', newTypeRoutes);
router.use('/news', newsRoutes);
router.use('/team-condition', teamConditionRoutes);
router.use('/privacy-policy', privacyPolicyRoutes);
router.use('/contactus', contactRoutes);


module.exports = router;
