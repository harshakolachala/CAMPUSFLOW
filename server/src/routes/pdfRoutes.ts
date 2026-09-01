import express from 'express';
import { processPDF, upload, getProcessingStatus } from '../controllers/pdfController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// Process PDF upload and generate mind map
router.post('/process', requireAuth, upload.single('pdf'), processPDF);

// Get processing status (for real-time updates)
router.get('/status/:id', requireAuth, getProcessingStatus);

export default router;
