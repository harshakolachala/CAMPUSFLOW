import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const saveSeatingPlan = async (req: Request, res: Response) => {
  const { room, plan, rows, cols, examDate, examName } = req.body;
  const userId = (req as AuthRequest).auth?.userId;

  if (!room?.trim() || !Array.isArray(plan) || !Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1 || rows > 50 || cols > 50 || !userId) {
    return res.status(400).json({ error: 'A valid room and seating grid are required' });
  }

  try {
    const seating = await prisma.seatingPlan.create({
      data: {
        room,
        rows,
        cols,
        plan: JSON.stringify(plan),
        userId,
        examDate: examDate ? new Date(examDate) : null,
        examName: examName?.trim() || null,
      },
    });
    res.json({ success: true, id: seating.id });
  } catch (error) {
    console.error('Seating save error:', error);
    res.status(500).json({ error: 'Failed to save seating plan' });
  }
};

export const getSeatingPlan = async (req: Request, res: Response) => {
  const { room } = req.query as { room?: string };
  try {
    const where = room ? { room } : {};
    const plans = await prisma.seatingPlan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    const formatted = plans.map(p => ({
      id: p.id,
      room: p.room,
      rows: p.rows,
      cols: p.cols,
      plan: JSON.parse(p.plan),
      createdAt: p.createdAt,
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Seating fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch seating plans' });
  }
}
