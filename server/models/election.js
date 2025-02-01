// const mongoose = require('mongoose');

// const electionSchema = new mongoose.Schema({
//     name: String,
//     date: Date
// });

// const Election = mongoose.model('Election', electionSchema);

// module.exports = Election;
const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    name: String,
    date: Date
});

module.exports = mongoose.model('Election', electionSchema);