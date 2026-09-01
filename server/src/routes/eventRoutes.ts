import { Router } from 'express';
import { getEvents, createEvent, updateEventStatus } from '../controllers/eventController';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getEvents);
router.post('/', requireAuth, requireRole('student', 'club_coordinator'), createEvent);
router.patch('/:id/status', requireAuth, requireRole('admin'), updateEventStatus);

export default router;
