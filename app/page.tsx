import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import Setlist from '@/components/Setlist';
import Footer from '@/components/Footer';

const quicksand = Quicksand();

export default async function Home() {
  return (
    <main className={`flex flex-col items-center h-screen bg-stone-900 ${quicksand.className}`}>
      <Metronome />
      <Setlist />
      <Footer />
    </main>
  );
}