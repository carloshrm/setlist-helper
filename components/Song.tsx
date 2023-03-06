import React, { SetStateAction, useState, type ReactElement } from 'react';
import { Song } from '@prisma/client';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Popup from './Popup';
import SongForm from './SongForm';
import TempoController from '@/controllers/TempoController';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
  songStateSetter: React.Dispatch<SetStateAction<Song[]>>;
  isActive: boolean;
}

function Song({ song, songStateSetter, isActive }: SongProps): ReactElement {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div onClick={(e) => {
      TempoController.setTempo(song);
    }} className={'border-stone-900 border-2 p-2 flex my-2 flex-col ' + (isActive ? 'bg-stone-900 border-emerald-800 scale-105' : '')} >

      <div className='flex w-full justify-between bg-emerald-900 px-1'>
        <p>{song.title}</p>
        <p>{song.bpm} BPM</p>
      </div>

      <p className='px-2'>{song.comments}</p>

      {showDelete
        ? <Popup
          okCallback={async () => {
            setShowDelete(false);
            songStateSetter(all => all.filter(s => s.id != song.id));
            fetch(`$/api/song/deleteSong`, {
              method: 'POST',
              body: JSON.stringify(song)
            });
          }}
          cclCallback={() => {
            setShowDelete(false);
          }} />
        : <></>}
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

      {showEdit
        ? <SongForm song={song} cclCallback={() => setShowEdit(false)} songStateSetter={songStateSetter} />
        : <></>}

    </div>
  );
}

export default Song;