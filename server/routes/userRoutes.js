const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', userController.register);

// Login a user
router.post('/login', userController.login);

// Reset password route
router.post('/resetPassword', userController.resetPassword);

// Retrieve voterID route
router.post('/retrieveVoterId', userController.retrieveVoterId);

module.exports = router;