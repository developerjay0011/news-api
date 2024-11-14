const db = require('../config/config');

class News {
    static async create({ title, description, image, link, topic, type, source, status, created_at, expire_date }) {
        // Convert topic array to JSON string for storage
        // const topicsJSON = JSON.stringify(topic);
        const [result] = await db.query(
            'INSERT INTO news_master (title, description, image, link, topic, type, source, status, created_at, expire_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, image, link, topic, type, source, status, created_at, expire_date]
        );
        const topics = JSON.parse(topic)
        return { id: result.insertId, title, description, image, link, topic: topics, type, source, status, created_at, expire_date };
    }

    static async update(id, fields) {
        const setClauses = [];
        const values = [];

        for (const [key, value] of Object.entries(fields)) {
            // If updating topic, convert it to a JSON string
            if (key === 'topic' && Array.isArray(value)) {
                setClauses.push(`${key} = ?`);
                values.push(JSON.stringify(value));
            } else {
                setClauses.push(`${key} = ?`);
                values.push(value);
            }
        }

        values.push(id);

        await db.query(
            `UPDATE news_master SET ${setClauses.join(', ')} WHERE id = ?`,
            values
        );
        return { id, ...fields };
    }

    static async delete(id) {
        await db.query('DELETE FROM news_master WHERE id = ?', [id]);
    }

    static async setStatus(id, status) {
        await db.query('UPDATE news_master SET status = ? WHERE id = ?', [status, id]);
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM news_master WHERE id = ?', [id]);
        if (rows.length > 0) {
            const news = rows[0];
            // Parse topic JSON string back into an array
            news.topic = JSON.parse(news.topic);
            return news;
        }
        return null;
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM news_master');
        return rows.map(row => {
            // Parse topic JSON string back into an array
            row.topic = JSON.parse(row.topic);
            return row;
        });
    }

    static async getNonExpired() {
        const [rows] = await db.query('SELECT * FROM news_master WHERE expire_date IS NULL OR expire_date > CURRENT_DATE');
        return rows.map(row => {
            // Parse topic JSON string back into an array
            row.topic = JSON.parse(row.topic);
            return row;
        });
    }
}

module.exports = News;
