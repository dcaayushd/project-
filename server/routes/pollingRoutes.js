const express = require('express');
const pollingController = require('../controllers/pollingController');

const router = express.Router();

// Get all polling stations
router.get('/', pollingController.getAllPollingStations);

// // Get polling stations by district
// router.get('/district/:district', pollingController.getPollingStationsByDistrict);

module.exports = router;