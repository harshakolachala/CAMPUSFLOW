import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import seatingRoutes from './routes/seatingRoutes';
import pdfRoutes from './routes/pdfRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/seating', seatingRoutes);
app.use('/api/pdf', pdfRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
