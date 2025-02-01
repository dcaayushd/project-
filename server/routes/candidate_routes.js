const express = require('express');
const Candidate = require('../models/candidate');

const router = express.Router();

// Get all candidates
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;