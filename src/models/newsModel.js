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
            setClauses.push(`${key} = ?`);
            values.push(value);
        }

        values.push(id); // Ensure ID is added only at the end for WHERE clause

        const query = `UPDATE news_master SET ${setClauses.join(', ')} WHERE id = ?`;

        const [result] = await db.query(query, values);
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
        return rows.map(row => ({
            ...row,
            topic: typeof row.topic === 'string' ? JSON.parse(row.topic) : row.topic
        }));
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM news_master');
        return rows.map(row => ({
            ...row,
            topic: typeof row.topic === 'string' ? JSON.parse(row.topic) : row.topic
        }));
    }

    static async getNonExpired() {
        const [rows] = await db.query('SELECT * FROM news_master WHERE expire_date IS NULL OR expire_date > CURRENT_DATE');
        return rows.map(row => ({
            ...row,
            topic: typeof row.topic === 'string' ? JSON.parse(row.topic) : row.topic
        }));
    }
}

module.exports = News;
