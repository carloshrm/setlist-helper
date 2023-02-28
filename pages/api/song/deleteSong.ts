// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { Song } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Song>) {
  if (req.method === 'POST') {
    const callInfo: Song = JSON.parse(req.body) as Song;
    try {
      const resp = await prisma.song.delete({ where: { id: callInfo.id } });
      return res.status(200).json(resp);
    } catch (e) {
      return res.status(500);
    }
  }
}
