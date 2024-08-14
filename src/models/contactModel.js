const db = require('../config/config');

class Contact {
    static async create({ name, email, subject, message }) {
        const [result] = await db.query(
            'INSERT INTO contact_us (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        return { id: result.insertId, name, email, subject, message };
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM contact_us ORDER BY created_at DESC');
        return rows;
    }
}

module.exports = Contact;
