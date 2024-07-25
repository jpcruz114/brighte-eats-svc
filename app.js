const express = require('express');
const sequelize = require('./models').sequelize;
const leadRoutes = require('./routes/LeadRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', leadRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Brighte Eats API');
});

// Sync models with the database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync database:', err));

module.exports = app;