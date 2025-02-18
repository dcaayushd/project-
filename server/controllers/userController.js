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
                voterId: user.voterId,
                votedFor: user.votedFor 
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Resets password
exports.resetPassword = async (req, res) => {
    try {
        const { identifier, dob, newPassword } = req.body;

        if (!identifier || !dob || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Convert the input dob to date object and set time to midnight
        const inputDate = new Date(dob);
        inputDate.setHours(0, 0, 0, 0);

        // Find user by either citizenship number or voter ID
        const user = await User.findOne({
            $or: [
                { citizenshipNumber: identifier.trim() },
                { voterId: identifier.trim() }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found with provided details' });
        }

        // Convert stored dob to midnight for comparison
        const storedDate = new Date(user.dob);
        storedDate.setHours(0, 0, 0, 0);

        // Compare dates
        if (inputDate.getTime() !== storedDate.getTime()) {
            return res.status(400).json({ message: 'Date of birth does not match our records' });
        }

        // Set the new password directly - it will be hashed by the pre-save middleware
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};
// Retrieve Voter ID
exports.retrieveVoterId = async (req, res) => {
    try {
        const { citizenshipNumber, dob } = req.body;

        // Convert the input dob to date object and set time to midnight
        const inputDate = new Date(dob);
        inputDate.setHours(0, 0, 0, 0);

        // Find user by citizenship number
        const user = await User.findOne({ citizenshipNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found with this citizenship number' });
        }

        // Convert stored dob to midnight for comparison
        const storedDate = new Date(user.dob);
        storedDate.setHours(0, 0, 0, 0);

        // Compare dates
        if (inputDate.getTime() !== storedDate.getTime()) {
            return res.status(400).json({ message: 'Date of birth does not match our records' });
        }

        res.status(200).json({
            message: 'Voter ID retrieved successfully',
            voterId: user.voterId
        });
    } catch (error) {
        console.error('Voter ID retrieval error:', error);
        res.status(500).json({ message: 'Error retrieving Voter ID', error: error.message });
    }
};


// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({
//             _id: user._id,
//             fullName: user.fullName,
//             votedFor: user.votedFor
//         });
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ message: 'Error fetching user data', error: error.message });
//     }
// };