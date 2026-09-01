import { Router } from 'express';
import { saveSeatingPlan, getSeatingPlan } from '../controllers/seatingController';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.post('/', requireAuth, requireRole('admin', 'seating_manager'), saveSeatingPlan);
router.get('/', requireAuth, getSeatingPlan);

export default router;
