const PrivacyPolicy = require('../models/privacyPolicyModel');

const addOrUpdatePrivacyPolicy = async (req, res) => {
    const { content } = req.body;

    try {
        const id = await PrivacyPolicy.addOrUpdate(content);
        res.json({ id, content });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.get();
        res.json(privacyPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addOrUpdatePrivacyPolicy, getPrivacyPolicy };
