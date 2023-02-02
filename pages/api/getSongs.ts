// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { Song } from '@prisma/client';


export default async function handler(req: NextApiRequest, res: NextApiResponse<Song[]>) {
  if (req.method === 'GET') {
    try {
      const info = await prisma.song.findMany();
      return res.status(200).json(info);
    } catch (e) {
      return res.status(500);
    }
  }
}
