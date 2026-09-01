import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  auth?: { userId: string; email: string; role: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'campusflow-development-secret') as jwt.JwtPayload;
    req.auth = { userId: String(payload.sub), email: String(payload.email), role: String(payload.role) };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.auth || !roles.includes(req.auth.role)) return res.status(403).json({ error: 'Insufficient permissions' });
  next();
};
