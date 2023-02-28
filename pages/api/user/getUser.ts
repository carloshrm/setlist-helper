// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { User } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.method === 'GET') {
    try {
      const response = await prisma.user.findUniqueOrThrow({
        where: {
          id: req.headers.cookie
        }
      });
      return res.status(200).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
}
