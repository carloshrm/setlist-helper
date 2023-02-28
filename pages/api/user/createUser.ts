// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.method === 'POST') {
    const callInfo: User = JSON.parse(req.body) as User;
    try {
      const resp = await prisma.user.create({
        data: {
          id: callInfo.id,
        }
      });
      return res.status(200).json(resp);
    } catch (e) {
      return res.status(500);
    }
  }
}
