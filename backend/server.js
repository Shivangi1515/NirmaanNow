import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import journalRoutes from './src/routes/journalRoutes.js';
import moodRoutes from './src/routes/moodRoutes.js';
import habitRoutes from './src/routes/habitRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import goalRoutes from './src/routes/goalRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'NirmaanNow API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
