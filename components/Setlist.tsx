'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Song as TSong } from '@prisma/client';

import SongController from '@/controllers/SongController';
import Song from '@/components/Song';
import SongForm from '@/components/SongForm';


function Setlist(): ReactElement {
  const [allSongs, setAllSongs] = useState<TSong[]>([]);
  const [showForm, setShowForm] = useState(false);

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
    <div className='bg-stone-800 flex flex-col w-full lg:w-5/6 my-2 p-1 '>
      <h2>Setlist</h2>
      {allSongs.length <= 0 ? (<h1>Loading...</h1>) : allSongs.map((s) => { return <Song key={s.id} song={s} />; })}
      <button className='self-start px-2 py-1 border-2 bg-stone-900' onClick={() => setShowForm(s => !s)}>Add</button>
      {showForm ? <SongForm cclCallback={() => setShowForm(false)} /> : <></>}
    </div>
  );
}

export default Setlist;