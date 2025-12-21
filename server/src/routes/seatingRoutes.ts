import { Router } from 'express';
import { saveSeatingPlan, getSeatingPlan } from '../controllers/seatingController';

const router = Router();

router.post('/', saveSeatingPlan);
router.get('/', getSeatingPlan);

export default router;
