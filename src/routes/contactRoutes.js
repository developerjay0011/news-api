const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');

// Public route for submitting contact form
router.post('/contact', createContact);

// Protected route for retrieving all contacts (requires authentication)
router.get('/contacts', getAllContacts);

module.exports = router;
