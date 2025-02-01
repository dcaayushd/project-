const Election = require('../models/election');

// Get all elections
exports.getAllElections = async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching elections', error });
    }
};