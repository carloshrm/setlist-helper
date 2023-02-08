'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Song as TSong } from '@prisma/client';

import SongController from '@/controllers/SongController';
import Song from '@/components/Song';
import SongForm from '@/components/SongForm';


function Setlist(): ReactElement {
  const [allSongs, setAllSongs] = useState<TSong[]>([]);
  const [add, showForm] = useState(false);

  useEffect(() => {
    (async () => {
      const dbSongs = await SongController.getInstance().getAllSongs();
      if (dbSongs != null)
        setAllSongs(dbSongs);
      SongController.getInstance().setObserverCallback((list: TSong[]) => {
        setAllSongs(list);
      });
    })();
  }, []);

  return (
    <div className='bg-stone-800 flex flex-col w-full lg:w-2/3 mx-4 my-2 py-2 px-4 '>
      <h2 className='mb-4'>Setlist</h2>
      {allSongs.length <= 0 ? (<h1>Loading...</h1>) : allSongs.map((s) => { return <Song key={s.id} song={s} />; })}
      <button onClick={() => showForm(s => !s)}>Add</button>
      {add ? <SongForm /> : <></>}
    </div>
  );
}

export default Setlist;