import React, { type ReactElement } from 'react';
import { Song } from '@prisma/client';
import SongController from '@/controllers/SongController';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
}

function Song({ song }: SongProps): ReactElement {
  return (
    <div className='border-2 flex my-2 flex-col'>
      <div className='flex w-full justify-between bg-emerald-900 px-1'>
        <p>{song.title}</p>
        <p>{song.bpm} BPM</p>
      </div>
      <p>{song.comments}</p>
      <div className='flex mt-4 items-center justify-between'>

        <p className='text-xs'>Added on {new Date(song.date_added).toLocaleDateString()}</p>
        <div>
          <button onClick={() => SongController.getInstance().deleteSong(song)}>
            <XCircleIcon className='h-4 w-4 fill-red-500' />
          </button>
          <button><PencilSquareIcon className="h-4 w-4" /></button>
        </div>

      </div>
    </div>
  );
}

export default Song;