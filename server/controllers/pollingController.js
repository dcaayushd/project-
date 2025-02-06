const PollingStation = require('../models/pollingStation'); 
exports.getAllPollingStations = async (req, res) => {
    try {
        const pollingStations = await PollingStation.find();
        res.status(200).json(pollingStations);
    } catch (error) {
        console.error('Error fetching polling stations:', error);
        res.status(500).json({ message: 'Error fetching polling stations', error });
    }
};