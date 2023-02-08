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
    <div>
      {allSongs.length <= 0 ? (<h1>Loading...</h1>) : allSongs.map((s) => { return <Song key={s.id} song={s} />; })}
      <button onClick={() => showForm(s => !s)}>Add</button>
      {add ? <SongForm /> : <></>}
    </div>
  );
}

export default Setlist;