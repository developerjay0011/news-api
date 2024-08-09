const express = require('express');
const router = express.Router();
const { addOrUpdateTeamCondition, getTeamCondition } = require('../controllers/teamConditionController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/add-or-update',authenticateToken, addOrUpdateTeamCondition);
router.get('/', getTeamCondition);

module.exports = router;
