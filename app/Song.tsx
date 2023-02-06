import React, { type ReactElement } from 'react';

export const limits = { minBPM: 40, maxBPM: 220 };

export interface ISong {
  id: number;
  title: string;
  comments: string;
  bpm: number;
  date: Date;
}

interface SongProps {
  song: ISong;
}

function Song({ song }: SongProps): ReactElement {

  return (
    <div>
      <p>Title: {song.title} BPM: {song.bpm} Date Added: {song.date.toLocaleDateString()}</p>
      <p>Comments: {song.comments}</p>
    </div>
  );
}

export default Song;