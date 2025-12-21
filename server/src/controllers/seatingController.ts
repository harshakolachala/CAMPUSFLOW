import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const saveSeatingPlan = async (req: Request, res: Response) => {
  const { room, plan, rows, cols, userId } = req.body;

  try {
    const seating = await prisma.seatingPlan.create({
      data: {
        room,
        rows,
        cols,
        plan: JSON.stringify(plan),
        userId,
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
