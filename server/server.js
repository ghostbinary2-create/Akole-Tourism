const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Copy user uploaded hero image and generated authentic place images to client/public
const artifactDir = 'C:\\Users\\Saideep\\.gemini\\antigravity-ide\\brain\\c7abc5ba-66c9-4274-b22b-a6b46ba0ed13';
const userUploadedDir = 'C:\\Users\\Saideep\\.gemini\\antigravity-ide\\brain\\a430a7f6-8bdf-4c6c-bd04-eda4dd9dee7b\\.user_uploaded';
const clientPublicDir = path.join(__dirname, '..', 'client', 'public');
const placesDir = path.join(clientPublicDir, 'places');

const imageMappings = [
  { src: 'kalsubai_peak_1788433043643.jpg', dest: 'kalsubai.jpg' },
  { src: 'bhandardara_lake_1788433078175.jpg', dest: 'bhandardara.jpg' },
  { src: 'sandhan_valley_1788433102479.jpg', dest: 'sandhan-valley.jpg' },
  { src: 'kokankada_cliff_1788433126396.jpg', dest: 'harishchandragad.jpg' },
  { src: 'ratangad_nedhe_1788433151963.jpg', dest: 'ratangad.jpg' },
  { src: 'randha_falls_1788433177325.jpg', dest: 'randha-falls.jpg' },
  { src: 'amruteshwar_temple_1788433202448.jpg', dest: 'amruteshwar.jpg' },
  { src: 'amk_expedition_1788433232123.jpg', dest: 'amk-trek.jpg' },
  { src: 'seed_bank_rural_1788433293601.jpg', dest: 'seed-bank.jpg' },
  { src: 'fofsandi_valley_1788433330496.jpg', dest: 'fofsandi.jpg' },
  { src: 'ajoba_parvat_1788433381710.jpg', dest: 'ajoba-parvat.jpg' },
  { src: 'samrad_camping_1788433423580.jpg', dest: 'samrad-camping.jpg' },
];

try {
  if (!fs.existsSync(clientPublicDir)) {
    fs.mkdirSync(clientPublicDir, { recursive: true });
  }
  if (!fs.existsSync(placesDir)) {
    fs.mkdirSync(placesDir, { recursive: true });
  }

  // Copy hero bg
  const heroSrc = path.join(userUploadedDir, 'media_1787399729390.jpg');
  if (fs.existsSync(heroSrc)) {
    fs.copyFileSync(heroSrc, path.join(clientPublicDir, 'hero-bg.jpg'));
  }

  // Copy Umbrella Falls image
  const umbrellaSrc = path.join(userUploadedDir, 'media_1787552062320.jpg');
  if (fs.existsSync(umbrellaSrc)) {
    fs.copyFileSync(umbrellaSrc, path.join(clientPublicDir, 'umbrella-falls.jpg'));
    fs.copyFileSync(umbrellaSrc, path.join(placesDir, 'umbrella-falls.jpg'));
  }

  // Copy all authentic place images
  imageMappings.forEach(item => {
    const srcFile = path.join(artifactDir, item.src);
    const destFile = path.join(placesDir, item.dest);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✅ Copied authentic image: ${item.dest}`);
    }
  });
} catch (err) {
  console.error('Error copying images:', err);
}

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploaded files and places
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/places', express.static(placesDir));

// Endpoint to copy images
app.get('/api/setup-hero', (req, res) => {
  try {
    const umbrellaSrc = path.join(userUploadedDir, 'media_1787552062320.jpg');
    if (fs.existsSync(umbrellaSrc)) {
      fs.copyFileSync(umbrellaSrc, path.join(clientPublicDir, 'umbrella-falls.jpg'));
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
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
  console.log(`🌐 Client URL allowed: ${CLIENT_URL}`);
  console.log(`==================================================`);
});
