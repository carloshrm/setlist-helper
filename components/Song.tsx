import React, { type ReactElement } from 'react';
import { Song } from '@prisma/client';
import SongController from '@/controllers/SongController';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
}

function Song({ song }: SongProps): ReactElement {
  return (
    <div>
      <p>Title: {song.title} BPM: {song.bpm} Date Added: {song.date_added.toString()}</p>
      <p>Comments: {song.comments}</p>
      <button onClick={() => {
        SongController.getInstance().deleteSong(song);
      }}>X</button>
    </div>
  );
}

export default Song;