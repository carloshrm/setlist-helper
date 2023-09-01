import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import Setlist from '@/components/Setlist';
import Footer from '@/components/Footer';

const quicksand = Quicksand({subsets: ['latin']});

export default async function Home() {
  return (
    <main className={`flex flex-col items-center h-screen bg-[url('/bg.jpg')] bg-cover ${quicksand.className}`}>
      <Metronome />
      <Setlist />
      <Footer />
    </main>
  );
}