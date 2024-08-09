const express = require('express');
const router = express.Router();
const { login, setPassword } = require('../controllers/adminController');

router.post('/login', login);
router.post('/set-password', setPassword);

module.exports = router;
