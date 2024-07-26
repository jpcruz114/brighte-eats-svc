require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const payload = {
  id: '12345',
  name: 'Admin',
};

const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log(token);
