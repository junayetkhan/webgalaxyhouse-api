const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://web-galaxy-house-app.vercel.app'], 
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://junayetkhanjon_db_user:MqGeUXBQAHeYSTAo@webgalaxycluster.wpj5nme.mongodb.net/webgalaxyhouse";

app.get('/', (req, res) => res.send('API is running...'));

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Failed!");
    console.log("ERROR DETAILS:", error.message);
  });