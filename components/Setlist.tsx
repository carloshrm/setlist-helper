'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Song as SongModel } from '@prisma/client';

import SongView from '@/components/Song';
import SongForm from '@/components/SongForm';
import UserBar from './UserBar';

export default function Setlist(): ReactElement {
  const [finishedLoading, setFinished] = useState(false);
  const [allSongs, setAllSongs] = useState<SongModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [localUser, setLocalUser] = useState<string | undefined>(undefined);

  async function fetchSongs(id: string) {
    const dbSongs = await fetch("/api/song/getAllSongs", {
      method: 'GET',
      body: id
    });
    if (dbSongs.ok) {
      const list = await dbSongs.json() as SongModel[];
      setAllSongs(list);
    }
  }

  async function fetchUser() {
    const previousSession = document.cookie.split("; ").find(r => r.startsWith("userid="))?.split("=")[1];
    if (previousSession != undefined) {
      setLocalUser(previousSession);
      await fetchSongs(previousSession);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchUser();
      setFinished(true);
    })();
  }, []);

  useEffect(() => {
    document.cookie = `userid=${localUser}; SameSite=None; Secure`;
  }, [localUser]);

  function saveSetlist() {
    allSongs.forEach(async s => {
      upsertSong(s);
    });
  }

  async function upsertSong(s: SongModel) {
    const info = await fetch(`${process.env.BASE_URL}/api/song/createSong`, {
      method: 'POST',
      body: JSON.stringify(s),
    });
  }

  return (
    <div className='bg-stone-800 flex flex-col w-full lg:w-5/6 my-2 p-1 '>
      <h2>Setlist</h2>
      {allSongs.length <= 0 ? (<h1 className='m-2'>{finishedLoading ? "Add a song to your setlist." : "Loading..."}</h1>) : allSongs.map((s) => { return <SongView key={s.id} song={s} saveCallback={upsertSong} />; })}
      <button className='self-start px-2 py-1 border-2 bg-stone-900' onClick={() => setShowForm(s => !s)}>Add</button>
      {showForm ? <SongForm cclCallback={() => setShowForm(false)} saveCallback={upsertSong} /> : <></>}
      <UserBar userID={localUser} setUserCallback={setLocalUser} saveCallback={saveSetlist} />
    </div>
  );
}