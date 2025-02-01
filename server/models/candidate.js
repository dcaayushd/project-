const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    bio: String,
    party: String,
    photo: String
});

module.exports = mongoose.model('Candidate', candidateSchema);