require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoute');

app.use(express.json()); // parse JSON bodies
app.use(cookieParser());

// Register auth routes under /api/auth
app.use('/api/auth', authRoutes);

// A simple public route
app.get('/', (req, res) => res.send('API is running'));

// Start server after DB connection
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
