const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, voterId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, voterId });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};