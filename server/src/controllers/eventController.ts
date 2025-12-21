import { Request, Response } from 'express';
import prisma from '../lib/prisma';

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
  const { name, description, date, clubName, userId } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        clubName,
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
