// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { User_info } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse<User_info>) {
  if (req.method === 'GET') {
    try {
      const response = await prisma.user_info.findUnique({
        where: {
          id: req.headers.cookie
        }
      });
      if (response != null)
        return res.status(200).json(response);
      else
        return res.status(404);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
  return res.status(401);
}
