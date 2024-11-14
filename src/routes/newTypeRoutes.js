const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const authenticateToken = require('../middleware/authMiddleware');
const { createNewType, updateNewType, deleteNewType, setNewTypeStatus, getAllNewTypes } = require('../controllers/newTypeController');

router.post('/create', authenticateToken, upload.single('image'), createNewType);
router.put('/update', authenticateToken, upload.single('image'), updateNewType);
router.delete('/delete/:id', authenticateToken, deleteNewType);
router.put('/set-status', authenticateToken, setNewTypeStatus);
router.get('/get-all', getAllNewTypes);
module.exports = router;
