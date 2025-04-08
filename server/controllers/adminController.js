const Admin = require('../models/admin');

exports.login = async (req, res) => {
    try {
        const { adminId, password } = req.body;

        // Find admin by adminId
        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare passwords
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Return success response
        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};