import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const allowedRoles = ['student', 'faculty', 'admin', 'seating_manager', 'club_coordinator'];
const signToken = (user: { id: string; email: string; role: string }) =>
  jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'campusflow-development-secret', { expiresIn: '8h' });

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name?.trim() || !email?.trim() || typeof password !== 'string' || password.length < 8 || !allowedRoles.includes(role)) {
    return res.status(400).json({ error: 'Name, valid role, email, and a password of at least 8 characters are required' });
  }
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: signToken(user),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  try {
    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In a production app, we would generate a JWT here.
    // For now, returning the user object confirms authentication.
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: signToken(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
