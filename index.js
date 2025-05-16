require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
const participantRoutes = require('./routes/participants');
const historyRoutes = require('./routes/history'); // 👈 add this line

app.use('/participants', participantRoutes);
app.use('/races', historyRoutes); // 👈 endpoint becomes /races/:raceId/push-history

// Health Check
app.get('/ping', (req, res) => {
  console.log('✅ Flutter app pinged the backend at', new Date().toISOString());
  res.json({ message: 'Backend is alive!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
