// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';
import { Song } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Song>) {
  if (req.method === 'POST') {
    const callInfo: Song = JSON.parse(req.body) as Song;
    try {
      const response = await prisma.song.update({
        where: { id: callInfo.id },
        data: {
          title: callInfo.title,
          comments: callInfo.comments,
          bpm: callInfo.bpm,
          date_added: callInfo.date_added
        }
      });
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500);
    }
  }
}
