// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { Song } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const callInfo: Song = JSON.parse(req.body);
      try {
        const info = await prisma.song.create({ data: callInfo });
        return res.status(200).json(info);
      } catch (e) {
        return res.status(500);
      }
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
}
