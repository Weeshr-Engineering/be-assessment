import { Request, Response } from 'express';

export function getGreetings(req: Request, res: Response) {
  res.json({ message: 'Hello World!🌍' });
}
