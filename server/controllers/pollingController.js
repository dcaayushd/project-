const PollingStation = require('../models/pollingStation');

// Get all polling stations
exports.getAllPollingStations = async (req, res) => {
    try {
        const pollingStations = await PollingStation.find();
        res.status(200).json(pollingStations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching polling stations', error });
    }
};

// Get polling stations by district
exports.getPollingStationsByDistrict = async (req, res) => {
    try {
        const { district } = req.params;
        const pollingStations = await PollingStation.find({ district });
        res.status(200).json(pollingStations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching polling stations', error });
    }
};