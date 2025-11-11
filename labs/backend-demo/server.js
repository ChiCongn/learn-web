import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { config } from './config.js';

const app = express();
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Backend running!'));

app.listen(config.PORT, () =>
    console.log(`Server running on http://localhost:${config.PORT}`)
);
