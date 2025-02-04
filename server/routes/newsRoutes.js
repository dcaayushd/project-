const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

// Route to fetch election news
router.get('/news', newsController.getElectionNews);

module.exports = router;