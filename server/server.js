const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'https://akole-tourism-38n3.vercel.app';

// Safe handling for static directories
const clientPublicDir = path.join(__dirname, '..', 'client', 'public');
const placesDir = path.join(clientPublicDir, 'places');

// Ensure directories exist locally if client folder is present
try {
  if (fs.existsSync(clientPublicDir) && !fs.existsSync(placesDir)) {
    fs.mkdirSync(placesDir, { recursive: true });
  }
} catch (e) {
  // Graceful ignore on decoupled server deployments
}

// Allowed CORS Origins for production and local development
const allowedOrigins = [
  CLIENT_URL,
  'https://akole-tourism-38n3.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow configured origins or any Vercel preview deployment (*.vercel.app)
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploaded files and places (if present)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
if (fs.existsSync(placesDir)) {
  app.use('/places', express.static(placesDir));
}

// Root endpoint for quick uptime checking
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Akole Tourism REST API',
    clientUrl: CLIENT_URL,
    timestamp: new Date().toISOString(),
  });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'Akole Tourism API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Mapping
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const statsRoutes = require('./routes/statsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stats', statsRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Akole Tourism Server running on port ${PORT}`);
  console.log(`🌐 Allowed Client URL: ${CLIENT_URL}`);
  console.log(`==================================================`);
});
