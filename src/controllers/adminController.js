const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findByEmail(email);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '112h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// New setPassword method
const setPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const admin = await Admin.findByEmail(email);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Admin.updatePassword(email, hashedPassword);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login, setPassword };
