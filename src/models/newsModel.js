const db = require('../config/config');

class News {
    static async create({ title, description, image, link, topic, status,created_at ,expire_date }) {
        const [result] = await db.query(
            'INSERT INTO news_master (title, description, image, link, topic, status,created_at, expire_date) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
            [title, description, image, link, topic, status,created_at, expire_date]
        );
        return { id: result.insertId, title, description, image, link, topic, status,  created_at,expire_date };
    }

    static async update(id, fields) {
        const setClauses = [];
        const values = [];

        for (const [key, value] of Object.entries(fields)) {
            setClauses.push(`${key} = ?`);
            values.push(value);
        }

        values.push(id);

        const [result] = await db.query(
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
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM news_master');
        return rows;
    }
    static async getNonExpired() {
        const [rows] = await db.query('SELECT * FROM news_master WHERE expire_date IS NULL OR expire_date > CURRENT_DATE');
        return rows;
    }
}

module.exports = News;
