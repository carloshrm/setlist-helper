import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import Setlist from '@/components/Setlist';

const quicksand = Quicksand();

export default async function Home() {
  // const userInfo = await UserController.getInstance().getUser();

  return (
    <main className={`flex flex-col justify-center items-center h-fit bg-stone-900 ${quicksand.className}`}>
      {/* <Metronome /> */}
      <Setlist />
    </main>
  );
}