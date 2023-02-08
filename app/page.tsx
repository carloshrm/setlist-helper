import styles from './page.module.css';
import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import Setlist from '@/components/Setlist';

const quicksand = Quicksand();

export default async function Home() {
  return (
    <main className={`flex flex-col justify-center items-center h-screen bg-stone-900 ${quicksand.className}`}>
      <Metronome presetRate={120} />
      <Setlist />
    </main>
  );
}
