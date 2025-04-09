// // const express = require('express');
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// // const userRoutes = require('./routes/userRoutes');
// // const candidateRoutes = require('./routes/candidateRoutes');
// // const voteRoutes = require('./routes/voteRoutes'); 
// // const electionRoutes = require('./routes/electionRoutes');
// // const pollingRoutes = require('./routes/pollingRoutes');
// // const newsRoutes = require('./routes/newsRoutes');
// // const adminRoutes = require('./routes/adminRoutes');

// // dotenv.config();
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(express.json());
// // app.use(express.static('public'));

// // // Routes
// // app.use('/api/users', userRoutes);
// // app.use('/api/candidates', candidateRoutes);
// // app.use('/api/vote', voteRoutes); 
// // app.use('/api/elections', electionRoutes);
// // app.use('/api/polling-stations', pollingRoutes);
// // app.use('/api', newsRoutes);
// // app.use('/api', adminRoutes);

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('Connected to MongoDB'))
// //     .catch(err => console.error('Could not connect to MongoDB', err));

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// // Force correct binary version for bcrypt
// process.env.BCRYPT_JS = 'false';
// if (process.env.NODE_ENV === 'production') {
//     process.env.DEBUG = 'mongoose,bcrypt';
//   }

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors'); // Added for CORS support
// const userRoutes = require('./routes/userRoutes');
// const candidateRoutes = require('./routes/candidateRoutes');
// const voteRoutes = require('./routes/voteRoutes');
// const electionRoutes = require('./routes/electionRoutes');
// const pollingRoutes = require('./routes/pollingRoutes');
// const newsRoutes = require('./routes/newsRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Enhanced Middleware
// app.use(cors({
//   origin: [
//     'https://egovernanceproject.vercel.app',
//     'http://localhost:3000'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// // Debug endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'active',
//     dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
//     environment: process.env.NODE_ENV || 'development',
//     timestamp: new Date().toISOString()
//   });
// });

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/candidates', candidateRoutes);
// app.use('/api/vote', voteRoutes);
// app.use('/api/elections', electionRoutes);
// app.use('/api/polling-stations', pollingRoutes);
// app.use('/api', newsRoutes);
// app.use('/api', adminRoutes);

// // // Enhanced MongoDB Connection
// // const connectDB = async () => {
// //   try {
// //     console.log('Attempting to connect to MongoDB...');
// //     console.log('Connection string:', process.env.MONGODB_URI);

// //     await mongoose.connect(process.env.MONGODB_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       serverSelectionTimeoutMS: 30000, // 30 seconds timeout
// //       socketTimeoutMS: 45000,
// //       retryWrites: true,
// //       w: 'majority'
// //     });

// //     console.log('MongoDB Connected:', mongoose.connection.host);
// //     console.log('Database Name:', mongoose.connection.db.databaseName);

// //     // Verify collections exist
// //     const collections = await mongoose.connection.db.listCollections().toArray();
// //     console.log('Available Collections:', collections.map(c => c.name));

// //   } catch (err) {
// //     console.error('MongoDB Connection Error:', err);
// //     console.error('Full error object:', JSON.stringify(err, null, 2));
// //     process.exit(1); // Exit with failure
// //   }
// // };

// // // Connect to MongoDB before starting server
// // connectDB()
// //   .then(() => {
// //     // Start the server only after DB connection is established
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //       console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// //     });
// //   })
// //   .catch(err => {
// //     console.error('Failed to initialize application:', err);
// //     process.exit(1);
// //   });

// // // Enhanced error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error('Unhandled error:', err);
// //   res.status(500).json({
// //     error: {
// //       message: err.message || 'Internal Server Error',
// //       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
// //     }
// //   });
// // });

// // // Handle unhandled promise rejections
// // process.on('unhandledRejection', (err) => {
// //   console.error('Unhandled Rejection:', err);
// // });

// // // Handle uncaught exceptions
// // process.on('uncaughtException', (err) => {
// //   console.error('Uncaught Exception:', err);
// //   process.exit(1);
// // });

// // Update your MongoDB connection code:
// const connectDB = async () => {
//     try {
//       console.log('Attempting to connect to MongoDB...');
      
//       await mongoose.connect(process.env.MONGODB_URI, {
//         serverSelectionTimeoutMS: 5000,
//         socketTimeoutMS: 30000,
//       });
  
//       console.log('MongoDB Connected:', mongoose.connection.host);
//       console.log('Database Name:', mongoose.connection.db.databaseName);
      
//       // Verify collections
//       const collections = await mongoose.connection.db.listCollections().toArray();
//       console.log('Available Collections:', collections.map(c => c.name));
      
//       return true;
//     } catch (err) {
//       console.error('MongoDB Connection Error:', err);
//       return false;
//     }
//   };
  
//   // Modified server startup
//   const startServer = async () => {
//     const dbConnected = await connectDB();
    
//     if (!dbConnected) {
//       console.error('Failed to connect to database - exiting');
//       process.exit(1);
//     }
  
//     const server = app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//       console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//     });
  
//     // Handle server errors
//     server.on('error', (err) => {
//       if (err.code === 'EADDRINUSE') {
//         console.error(`Port ${PORT} is already in use`);
//         console.log('Trying port', PORT + 1);
//         app.listen(PORT + 1);
//       } else {
//         console.error('Server error:', err);
//       }
//     });
//   };
  
//   startServer();



process.env.BCRYPT_JS = 'false';
if (process.env.NODE_ENV === 'production') {
  process.env.DEBUG = 'mongoose,bcrypt';
}

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 10000; // Render uses 10000 by default

// Enhanced Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://election-frontend-r5bu.onrender.com'
    // 'https://election-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Routes
const router = express.Router();
router.use('/users', require('./routes/userRoutes'));
router.use('/candidates', require('./routes/candidateRoutes'));
router.use('/vote', require('./routes/voteRoutes'));
router.use('/elections', require('./routes/electionRoutes'));
router.use('/polling-stations', require('./routes/pollingRoutes'));
router.use('/', require('./routes/newsRoutes'));
router.use('/', require('./routes/adminRoutes'));

app.use('/api', router);

// Enhanced MongoDB Connection
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      retryWrites: true,
      w: 'majority'
    });

    console.log('MongoDB Connected:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.db.databaseName);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} in use, trying ${PORT + 1}`);
      app.listen(PORT + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
};

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Internal Server Error'
  });
});

startServer();