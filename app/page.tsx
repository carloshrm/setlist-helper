import styles from './page.module.css';
import Song from './Song';

import Metronome from './Metronome';

async function getSongs() {
  const info = await fetch(`${process.env.BASE_FETCH_URL}/api/getSongs`);
  if (info.ok) {
    return info.json();
  }
  return null;
}

export default async function Home() {
  const songData: (typeof Song)[] = await getSongs();
  return (
    <main>
      <div>
        <Metronome presetRate={120} />
      </div>
      <Song title={'abcd'} bpm={20} />
    </main>
  );
}
