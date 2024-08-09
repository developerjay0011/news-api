const db = require('../config/config');

class PrivacyPolicy {
    static async addOrUpdate(content) {
        const [rows] = await db.query('SELECT * FROM privacy_policy LIMIT 1');
        if (rows.length > 0) {
            await db.query('UPDATE privacy_policy SET content = ? WHERE id = ?', [content, rows[0].id]);
            return rows[0].id;
        } else {
            const [result] = await db.query('INSERT INTO privacy_policy (content) VALUES (?)', [content]);
            return result.insertId;
        }
    }

    static async get() {
        const [rows] = await db.query('SELECT * FROM privacy_policy LIMIT 1');
        return rows[0];
    }
}

module.exports = PrivacyPolicy;
