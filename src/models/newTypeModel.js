const db = require('../config/config');

class NewType {
    static async create({ name, status, image }) {
        const [result] = await db.query(
            'INSERT INTO newtype_master (name, status, image) VALUES (?, ?, ?)',
            [name, status, image]
        );
        return { id: result.insertId, name, status, image };
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM newtype_master WHERE id = ?', [id]);
        return rows[0];
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
            `UPDATE newtype_master SET ${setClauses.join(', ')} WHERE id = ?`,
            values
        );
        return { id, ...fields };
    }
    static async delete(id) {
        await db.query('DELETE FROM newtype_master WHERE id = ?', [id]);
    }

    static async setStatus(id, status) {
        await db.query('UPDATE newtype_master SET status = ? WHERE id = ?', [status, id]);
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM newtype_master WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query('SELECT * FROM newtype_master');
        return rows;
    }

}

module.exports = NewType;
