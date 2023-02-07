import React, { type ReactElement } from 'react';
import { Song } from '@prisma/client';

export const limits = { minBPM: 40, maxBPM: 220 };

interface SongProps {
  song: Song;
}

function Song({ song }: SongProps): ReactElement {
  return (
    <div>
      <p>Title: {song.title} BPM: {song.bpm} Date Added: {song.date_added.toString()}</p>
      <p>Comments: {song.comments}</p>
    </div>
  );
}

export default Song;