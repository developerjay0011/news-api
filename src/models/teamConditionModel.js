const db = require('../config/config');

class TeamCondition {
    static async addOrUpdate(content) {
        const [rows] = await db.query('SELECT * FROM team_and_condition LIMIT 1');
        if (rows.length > 0) {
            await db.query('UPDATE team_and_condition SET content = ? WHERE id = ?', [content, rows[0].id]);
            return rows[0].id;
        } else {
            const [result] = await db.query('INSERT INTO team_and_condition (content) VALUES (?)', [content]);
            return result.insertId;
        }
    }

    static async get() {
        const [rows] = await db.query('SELECT * FROM team_and_condition LIMIT 1');
        return rows[0];
    }
}

module.exports = TeamCondition;
