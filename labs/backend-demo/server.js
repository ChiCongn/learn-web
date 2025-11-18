import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { config } from './config.js';
import sequelize from './db.js';

const app = express();
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect DB
await sequelize.sync({ alter: true });
console.log('Connected database successfully!');

// Health check
app.get('/', (req, res) => res.send('Backend running!'));

// Start server
app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
