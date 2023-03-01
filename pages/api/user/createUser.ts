// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { User_info } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<User_info>) {
  if (req.method === 'POST') {
    const callInfo: User_info = JSON.parse(req.body) as User_info;
    try {
      const resp = await prisma.user_info.create({
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
