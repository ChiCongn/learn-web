import express from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { config } from '../config.js';

const router = express.Router();

const fakeUser = { email: 'admin', password: '123' };

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === fakeUser.email && password === fakeUser.password) {
        const token = jwt.sign({ email }, config.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Email hoặc mật khẩu sai' });
});

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.email}, you are logged in!` });
});

export default router;
