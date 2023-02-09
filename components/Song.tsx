import React, { useState, type ReactElement } from 'react';
import { Song } from '@prisma/client';
import SongController from '@/controllers/SongController';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Popup from './Popup';
import SongForm from './SongForm';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
}

function Song({ song }: SongProps): ReactElement {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='border-stone-600 border-2 flex my-2 flex-col'>

      <div className='flex w-full justify-between bg-emerald-900 px-1'>
        <p>{song.title}</p>
        <p>{song.bpm} BPM</p>
      </div>

      <p>{song.comments}</p>

      <div className='flex mt-2 items-center justify-between'>
        <p className='text-xs'>Added on {new Date(song.date_added).toLocaleDateString()}</p>
        <div>
          <button onClick={() => setShowEdit(e => !e)}>
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          <button onClick={() => setShowDelete(s => !s)}>
            <XCircleIcon className='h-4 w-4 fill-red-500 mx-2' />
          </button>
        </div>
      </div>

      {showDelete
        ? <Popup message={`Really delete '${song.title}'?`}
          okCallback={() => {
            () =>
              setShowDelete(false);
            SongController.getInstance().deleteSong(song);
          }}
          cclCallback={() => {
            setShowDelete(false);
          }} />
        : <></>}

      {showEdit
        ? <SongForm song={song} cclCallback={() => setShowEdit(false)} />
        : <></>}

    </div>
  );
}

export default Song;