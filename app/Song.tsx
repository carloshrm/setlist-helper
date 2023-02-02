import React, { type ReactElement } from 'react';

interface SongProperties {
  title: string;
  bpm: number;
}

function Song({ title, bpm }: SongProperties): ReactElement {
  return (
    <div>
      <p>Title: {title}</p>
      <p>bpm: {bpm}</p>
    </div>
  );
}

export default Song;