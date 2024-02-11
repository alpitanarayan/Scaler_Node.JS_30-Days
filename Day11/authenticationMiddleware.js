const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

function authenticationMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkiLCJ1c2VybmFtZSI6ImV4YW1wbGVfdXNlciIsImlhdCI6MTcwNzY2NDIwNX0.gSN0YaKLeRxk4WiTR8nnv0oV-ZG_WqynDiJkKjrBopU');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authenticationMiddleware;
