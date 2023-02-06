// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { Song } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse<Song[]>) {
  if (req.method === 'GET') {
    const callInfo: Song = JSON.parse(req.body);
    try {
      await prisma.song.delete({ where: callInfo });
      return res.status(200);
    } catch (e) {
      return res.status(500);
    }
  }
}
