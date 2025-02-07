// candidateRoutes.js
const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

// Get all candidates
router.get('/', candidateController.getAllCandidates);

// Get top 3 candidates
router.get('/top', candidateController.getTopCandidates);

module.exports = router;