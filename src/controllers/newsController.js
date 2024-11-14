// const News = require('../models/newsModel');

// const createNews = async (req, res) => {
//     const { title, description, link, topic, status, expire_date } = req.body;
//     const image = req.file ? req.file.filename : null;

//     try {
//         const news = await News.create({ title, description, image, link, topic, status,created_at:new Date(), expire_date });
//         res.status(201).json(news);
//     } catch (error) {
//         console.log("dsdsd",error)
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const updateNews = async (req, res) => {
//     const { id } = req.body;
//     const fields = {};

//     if (req.body.title) fields.title = req.body.title;
//     if (req.body.description) fields.description = req.body.description;
//     if (req.body.link) fields.link = req.body.link;
//     if (req.body.topic) fields.topic = req.body.topic;
//     if (req.body.expire_date) fields.expire_date = req.body.expire_date;
//     if (req.file) fields.image = req.file.filename;


//     try {
//         const existingNews = await News.findById(id);
//         if (!existingNews) {
//             return res.status(404).json({ message: 'News not found' });
//         }

//         const updatedFields = { ...existingNews, ...fields };
//         await News.update(id, updatedFields);
//         res.status(200).json(updatedFields);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const deleteNews = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await News.delete(id);
//         res.json({ message: 'News deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const setNewsStatus = async (req, res) => {
//     const { id, status } = req.body;

//     try {
//         await News.setStatus(id, status);
//         res.json({ message: `News ${status ? 'enabled' : 'disabled'} successfully` });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const getAllNews = async (req, res) => {
//     try {
//         const news = await News.findAll();

//         const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
//         const newsWithFullImageUrl = news.map(item => ({
//             ...item,
//             image: item.image ? `${baseUrl}${item.image}` : null
//         }));
//         res.json(newsWithFullImageUrl);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// const getNonExpiredNews = async (req, res) => {
//     try {
//         const news = await News.getNonExpired();
//         const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
//         const newsWithImageUrl = news.map(item => ({
//             ...item,
//             image: item.image ? `${baseUrl}${item.image}` : null
//         }));
//         res.status(200).json(newsWithImageUrl);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
// module.exports = { createNews, updateNews, deleteNews, setNewsStatus ,getAllNews,getNonExpiredNews};




const News = require('../models/newsModel');
const admin = require('../config/firebase');
const createNews = async (req, res) => {
    const { title, description, link, topic, type, source, status, expire_date } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log(topic)
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    try {
        const news = await News.create({
            title,
            description,
            image,
            link,
            topic: Array.isArray(topic) ? topic : [topic], // Ensure topic is an array
            type,
            source,
            status,
            created_at: new Date(),
            expire_date
        });
        // Send push notification to all users
        const message = {
            notification: {
                title: 'New News Added',
                body: title,
                image: news.image ? `${baseUrl}${news.image}` : null,
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
        res.status(500).json({ message: 'Server error' });
    }
};

const updateNews = async (req, res) => {
    const { id } = req.body;
    const fields = {};

    if (req.body.title) fields.title = req.body.title;
    if (req.body.description) fields.description = req.body.description;
    if (req.body.link) fields.link = req.body.link;
    if (req.body.topic) fields.topic = Array.isArray(req.body.topic) ? req.body.topic : [req.body.topic];
    if (req.body.type) fields.type = req.body.type;
    if (req.body.source) fields.source = req.body.source;
    if (req.body.expire_date) fields.expire_date = req.body.expire_date;
    if (req.file) fields.image = req.file.filename;

    try {
        const existingNews = await News.findById(id);
        if (!existingNews) {
            return res.status(404).json({ message: 'News not found' });
        }

        const updatedFields = { ...existingNews.toObject(), ...fields };
        await News.update(id, updatedFields);
        res.status(200).json(updatedFields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        await News.delete(id);
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const setNewsStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        await News.setStatus(id, status);
        res.json({ message: `News ${status ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllNews = async (req, res) => {
    try {
        try {
            const news = await News.findAll();
            const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
            const newsWithFullImageUrl = news.map(item => ({
                ...item,
                image: item.image ? `${baseUrl}${item.image}` : null
            }));
            res.json(newsWithFullImageUrl);
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getNonExpiredNews = async (req, res) => {
    try {
        const news = await News.getNonExpired();
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const newsWithImageUrl = news.map(item => ({
            ...item,
            image: item.image ? `${baseUrl}${item.image}` : null
        }));
        res.status(200).json(newsWithImageUrl);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createNews, updateNews, deleteNews, setNewsStatus, getAllNews, getNonExpiredNews };
