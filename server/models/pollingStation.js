const mongoose = require('mongoose');

const pollingStationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    openingHours: { type: String, required: true }
});

module.exports = mongoose.model('PollingStation', pollingStationSchema);