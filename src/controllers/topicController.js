const Topic = require('../models/topicModel');
const getImageUrl = require('../utils/helpers')
const createTopic = async (req, res) => {
    const { name, status } = req.body;
    const image = req.file ? req.file.key : null;

    try {
        const topic = await Topic.create({ name, status, image });
        res.status(201).json(topic);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTopic = async (req, res) => {
    const { id, name, status } = req.body;
    const fields = {};

    if (name) fields.name = name;
    if (status !== undefined) fields.status = status;
    if (req.file) fields.image = req.file.filename;

    try {
        const existingTopic = await Topic.findById(id);
        if (!existingTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        const updatedFields = { ...existingTopic, ...fields };
        await Topic.update(id, updatedFields);
        res.status(200).json(updatedFields);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.params;

    try {
        await Topic.delete(id);
        res.json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const setTopicStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        await Topic.setStatus(id, status);
        res.json({ message: `Topic ${status ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        const topicsWithFullImageUrl = await Promise.all(topics.map(async (item) => ({
            ...item,
            image: item.image ? await getImageUrl(item.image) : null
        })));
        res.json(topicsWithFullImageUrl);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createTopic, updateTopic, deleteTopic, setTopicStatus, getAllTopics };
