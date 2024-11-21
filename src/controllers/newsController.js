

const News = require('../models/newsModel');
const getImageUrl = require('../utils/helpers');
const admin = require('../config/firebase');
const createNews = async (req, res) => {
    const { title, description, link, topic, type, source, status, expire_date, end_trending } = req.body;
    const image = req.file ? req.file.key : null;
    try {
        const news = await News.create({
            title,
            description,
            image,
            link,
            topic: topic, // Ensure topic is an array
            type,
            source,
            status,
            created_at: new Date(),
            expire_date,
            end_trending
        });
        // Send push notification to all users
        const message = {
            notification: {
                title: 'New News Added',
                body: title,
                image: news.image ? await getImageUrl(news.image) : null,
            },
            data: {
                newsId: news.id.toString(),
                title: title,
                description: description,
            },
            topic: 'news', // Send to all users subscribed to the topic
        };

        await admin.messaging().send(message);
        res.status(200).json(news);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const updateNews = async (req, res) => {
    const { id } = req.body;
    const fields = {};

    if (req.body.title) fields.title = req.body.title;
    if (req.body.description) fields.description = req.body.description;
    if (req.body.link) fields.link = req.body.link;
    if (req.body.topic) {
        if (Array.isArray(req.body.topic)) {
            fields.topic = req.body.topic
        } else {
            try {
                fields.topic = JSON.parse(req.body.topic)
            } catch (error) {
                fields.topic = [req.body.topic]
            }
        }
    }
    if (req.body.type) fields.type = req.body.type;
    if (req.body.source) fields.source = req.body.source;
    if (req.body.expire_date) fields.expire_date = req.body.expire_date;
    if (req.file) fields.image = req.file.key;
    if (req.body.end_trending) fields.image = req.body.end_trending;



    try {
        // const existingNews = await News.findById(id);
        // if (!existingNews) {
        //     return res.status(404).json({ message: 'News not found' });
        // }

        const updatedFields = { ...fields };
        await News.update(id, updatedFields);
        res.status(200).json(updatedFields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        await News.delete(id);
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const setNewsStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        await News.setStatus(id, status);
        res.json({ message: `News ${status ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const getAllNews = async (req, res) => {
    try {
        try {
            const news = await News.findAll();
            const newsWithFullImageUrl = await Promise.all(news.map(async (item) => ({
                ...item,
                image: item.image ? await getImageUrl(item.image) : null
            }))
            );
            res.json(newsWithFullImageUrl);
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const getNonExpiredNews = async (req, res) => {
    try {
        const news = await News.getNonExpired();
        const newsWithImageUrl = await Promise.all(
            news.map(async (item) => ({
                ...item,
                image: item.image ? await getImageUrl(item.image) : null
            }))
        );
        res.status(200).json(newsWithImageUrl);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

module.exports = { createNews, updateNews, deleteNews, setNewsStatus, getAllNews, getNonExpiredNews };
