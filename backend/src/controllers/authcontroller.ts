import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET!, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user.id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Refresh Token
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_SECRET!, async (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);

      const user = await User.findById(decoded.userId);
      if (!user || user.refreshToken !== token) return res.sendStatus(403);

      const { accessToken, refreshToken } = generateTokens(user.id);
      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
      res.json({ accessToken });
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.sendStatus(500);
  }
};
