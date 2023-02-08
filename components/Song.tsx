import React, { type ReactElement } from 'react';
import { Song } from '@prisma/client';
import SongController from '@/controllers/SongController';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
}

function Song({ song }: SongProps): ReactElement {
  return (
    <div className='border-2 flex flex-col'>
      <div className='flex w-full justify-between bg-emerald-900 px-1'>
        <p>{song.title}</p>
        <p>{song.bpm} BPM</p>
      </div>
      <p>{song.comments}</p>
      <div>

        <p>Added on {new Date(song.date_added).toLocaleDateString()}</p>
        <button className='max-w-fit px-2 font-bold text-sm border-black bg-red-800' onClick={() => {
          SongController.getInstance().deleteSong(song);
        }}>X</button>
        <button>Edit</button>
      </div>
    </div>
  );
}

export default Song;