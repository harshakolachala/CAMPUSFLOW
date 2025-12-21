import { Router } from 'express';
import { getEvents, createEvent, updateEventStatus } from '../controllers/eventController';

const router = Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id/status', updateEventStatus);

export default router;
