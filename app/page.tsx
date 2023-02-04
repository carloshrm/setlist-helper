import styles from './page.module.css';
import Song from './Song';
import Metronome from './Metronome';
import { Quicksand } from '@next/font/google';

const quicksand = Quicksand();

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
    <main className={`flex flex-col justify-center items-center h-screen bg-stone-900 ${quicksand.className}`}>
      <Metronome presetRate={120} />
      <Song title={'abcd'} bpm={20} />
    </main>
  );
}
