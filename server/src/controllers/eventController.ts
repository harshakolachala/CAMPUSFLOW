import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        createdBy: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { name, description, date, clubName, venue, capacity } = req.body;
  const userId = (req as AuthRequest).auth?.userId;

  if (!name?.trim() || !description?.trim() || !clubName?.trim() || !date || Number.isNaN(new Date(date).getTime()) || !userId) {
    return res.status(400).json({ error: 'Valid name, description, club, and date are required' });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        date: new Date(date),
        clubName: clubName.trim(),
        venue: venue?.trim() || null,
        capacity: capacity ? Number(capacity) : null,
        userId,
        status: 'pending',
      },
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const updateEventStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ error: 'Invalid event status' });

  try {
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};
