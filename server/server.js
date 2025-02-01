// // const express = require('express');
// // const mongoose = require('mongoose');
// // const electionRoutes = require('./routes/electionRoutes');

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(express.json());
// // app.use(express.static('public'));

// // // Routes
// // app.use('/api/elections', electionRoutes);

// // // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/electionDB', { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('Connected to MongoDB'))
// //     .catch(err => console.error('Could not connect to MongoDB', err));

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// const express = require('express');
// const mongoose = require('mongoose');
// const electionRoutes = require('./routes/electionRoutes');
// const newsRoutes = require('./routes/newsRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const dotenv = require('dotenv');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.static('public'));

// // Routes
// app.use('/api/elections', electionRoutes);
// app.use('/api/news', newsRoutes);
// app.use('/api/contact', contactRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const electionRoutes = require('./routes/electionRoutes');
const pollingRoutes = require('./routes/pollingRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/polling', pollingRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});