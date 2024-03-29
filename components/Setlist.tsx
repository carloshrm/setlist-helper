'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Song as SongModel } from '@prisma/client';

import SongView from '@/components/Song';
import SongForm from '@/components/SongForm';
import User from './User';
import TempoController from '@/controllers/TempoController';

export default function Setlist(): ReactElement {
  const [finishedLoading, setFinished] = useState(false);
  const [allSongs, setAllSongs] = useState<SongModel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [localUser, setLocalUser] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<number>(99);

  function fetchUser() {
    return document.cookie.split("; ").find(r => r.startsWith("userid="))?.split("=")[1];
  }

  async function fetchSongs(id: string) {
    const dbSongs = await fetch(`/api/song/getAllSongs`, {
      method: 'GET',
      headers: {
        cookie: id
      }
    });
    if (dbSongs.ok) {
      const list = await dbSongs.json() as SongModel[];
      setAllSongs(list);
    }
  }

  useEffect(() => {
    (async () => {
      const localID = fetchUser();
      if (localID != undefined) {
        setLocalUser(localID);
        await fetchSongs(localID);
      }
      setFinished(true);
      TempoController.activeSetup(setActive);
    })();
  }, []);

  useEffect(() => {
    if (localUser != undefined) {
      document.cookie = `userid=${localUser}; SameSite=None; Secure`;
      fetchSongs(localUser);
    }
  }, [localUser]);

  useEffect(() => {
    if (localUser != undefined)
      saveSetlist(localUser);
    else {
      let i: number = 0;
      for (const s of allSongs) {
        s.id = i++;
      }
    }
  }, [allSongs]);

  function saveSetlist(id: string) {
    allSongs.forEach(async s => {
      s.userId = id;
      const response = await upsertSong(s);
      s.id = response.id;
    });
  }

  async function upsertSong(s: SongModel): Promise<SongModel> {
    const info = await fetch(`/api/song/createSong`, {
      method: 'POST',
      body: JSON.stringify(s),
    });
    return info.json();
  }

  return (
    <div className='bg-stone-800 flex flex-col justify-start w-full flex-grow xl:w-5/6 my-2 p-1 '>
      <h1 className='text-lg mx-2'>Setlist</h1>
      {allSongs.length <= 0 ? (<h1 className='m-2'>{finishedLoading ? "Add a song to your setlist." : "Loading..."}</h1>) : allSongs.map((s) => { return <SongView key={s.id} song={s} songStateSetter={setAllSongs} isActive={s.id === active} />; })}
      <button className='self-start px-2 mx-2 border-2 border-black text-stone-900 bg-white' onClick={() => setShowForm(s => !s)}>Add</button>
      {showForm ? <SongForm cclCallback={() => setShowForm(false)} songStateSetter={setAllSongs} /> : <></>}
      <User userID={localUser} setUserCallback={setLocalUser} saveCallback={(uid: string) => saveSetlist(uid)} />
    </div>
  );
}