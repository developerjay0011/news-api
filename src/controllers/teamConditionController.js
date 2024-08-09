const TeamCondition = require('../models/teamConditionModel');

const addOrUpdateTeamCondition = async (req, res) => {
    const { content } = req.body;

    try {
        const id = await TeamCondition.addOrUpdate(content);
        res.json({ id, content });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeamCondition = async (req, res) => {
    try {
        const teamCondition = await TeamCondition.get();
        res.json(teamCondition);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addOrUpdateTeamCondition, getTeamCondition };
