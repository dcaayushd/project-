const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { fullName, address, dob, citizenshipNumber, password } = req.body;

        // Validate required fields
        if (!fullName || !address || !dob || !citizenshipNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ citizenshipNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a unique 8-digit voter ID
        const voterId = Math.floor(10000000 + Math.random() * 90000000).toString();

        // Create a new user
        const user = new User({
            fullName,
            address,
            dob: new Date(dob),
            citizenshipNumber,
            password,
            voterId,
        });

        // Save the user to the database
        await user.save();

        // Return success response
        res.status(201).json({ message: 'User registered successfully!', voterId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { loginId, password } = req.body;
        
        // Find user by voterId or citizenshipNumber
        const user = await User.findOne({ 
            $or: [
                { voterId: loginId }, 
                { citizenshipNumber: loginId } 
            ] 
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords using the method from the user model
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ 
            message: 'Login successful!', 
            user: { 
                _id: user._id, 
                fullName: user.fullName, 
                voterId: user.voterId 
            } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { citizenshipNumber, dob, newPassword } = req.body;
        
        // Find user by citizenship number and date of birth
        const user = await User.findOne({ 
            citizenshipNumber, 
            dob: { $gte: new Date(dob), $lt: new Date(dob).setDate(new Date(dob).getDate() + 1) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};