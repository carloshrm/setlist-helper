import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import Setlist from '@/components/Setlist';
import UserHeader from '@/components/UserHeader';

const quicksand = Quicksand();

export default async function Home() {
  return (
    <main className={`flex flex-col justify-center items-center h-fit bg-stone-900 ${quicksand.className}`}>
      <UserHeader />
      <Metronome />
      <Setlist />
    </main>
  );
}