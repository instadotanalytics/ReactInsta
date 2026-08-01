import express from 'express';
import { ADMIN } from '../config/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Both fields are required' });

  const isMatch = await bcrypt.compare(password, ADMIN.password);

  if (username === ADMIN.username && isMatch) {
    // JWT token valid for 24 hours
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, message: 'Login successful', token, data: { username } });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

export default router;