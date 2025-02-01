const express = require('express');
const Election = require('../models/election');

const router = express.Router();

// Get all elections
router.get('/', async (req, res) => {
    try {
        const elections = await Election.find();
        res.json(elections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new election
router.post('/', async (req, res) => {
    const election = new Election({
        name: req.body.name,
        date: req.body.date
    });

    try {
        const newElection = await election.save();
        res.status(201).json(newElection);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;