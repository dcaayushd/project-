const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const voteRoutes = require('./routes/voteRoutes'); 
const electionRoutes = require('./routes/electionRoutes');
const pollingRoutes = require('./routes/pollingRoutes');
const newsRoutes = require('./routes/newsRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/vote', voteRoutes); 
app.use('/api/elections', electionRoutes);
app.use('/api/polling-stations', pollingRoutes);
app.use('/api', newsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});