const db = require('../config/config');

class Admin {
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
        return rows[0];
    }

    static async updatePassword(email, newPassword) {
        await db.query('UPDATE admins SET password = ? WHERE email = ?', [newPassword, email]);
    }
}

module.exports = Admin;
