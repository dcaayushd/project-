const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const Candidate = require('../models/candidate');
const Election = require('../models/election');
const PollingStation = require('../models/pollingStation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const { adminId, password } = req.body;

        const admin = await Admin.findOne({ adminId });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// CRUD for Candidates
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching candidates', error });
    }
});

router.post('/candidates', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Error creating candidate', error });
    }
});

router.put('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Error updating candidate', error });
    }
});

router.delete('/candidates/:id', async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting candidate', error });
    }
});

// CRUD for Elections
router.get('/elections', async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching elections', error });
    }
});

router.post('/elections', async (req, res) => {
    try {
        const election = new Election(req.body);
        await election.save();
        res.status(201).json(election);
    } catch (error) {
        res.status(500).json({ message: 'Error creating election', error });
    }
});

router.put('/elections/:id', async (req, res) => {
    try {
        const election = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(election);
    } catch (error) {
        res.status(500).json({ message: 'Error updating election', error });
    }
});

router.delete('/elections/:id', async (req, res) => {
    try {
        await Election.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Election deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting election', error });
    }
});

// CRUD for Polling Stations
router.get('/polling-stations', async (req, res) => {
    try {
        const pollingStations = await PollingStation.find();
        res.status(200).json(pollingStations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching polling stations', error });
    }
});

router.post('/polling-stations', async (req, res) => {
    try {
        const pollingStation = new PollingStation(req.body);
        await pollingStation.save();
        res.status(201).json(pollingStation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating polling station', error });
    }
});

router.put('/polling-stations/:id', async (req, res) => {
    try {
        const pollingStation = await PollingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(pollingStation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating polling station', error });
    }
});

router.delete('/polling-stations/:id', async (req, res) => {
    try {
        await PollingStation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Polling station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting polling station', error });
    }
});

// CRUD for Users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;