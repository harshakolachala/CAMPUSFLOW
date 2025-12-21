import express from 'express';
import { processPDF, upload, getProcessingStatus } from '../controllers/pdfController';

const router = express.Router();

// Process PDF upload and generate mind map
router.post('/process', upload.single('pdf'), processPDF);

// Get processing status (for real-time updates)
router.get('/status/:id', getProcessingStatus);

export default router;