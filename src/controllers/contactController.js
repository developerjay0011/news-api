const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const contact = await Contact.create({ name, email, subject, message });
        res.status(201).json({ message: 'Your message has been sent successfully.', data: contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.getAll();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
};

module.exports = {
    createContact,
    getAllContacts,
};
