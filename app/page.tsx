import styles from './page.module.css';
import Song from '../components/Song';
import Metronome from '../components/Metronome';
import { Quicksand } from '@next/font/google';
import SongForm from './SongForm';
import SongController from '../controllers/SongController';
import { Song as TSong } from '@prisma/client';

const quicksand = Quicksand();

export default async function Home() {

  const songData: TSong[] = await SongController.getInstance().getSongs();
  return (
    <main className={`flex flex-col justify-center items-center h-screen bg-stone-900 ${quicksand.className}`}>
      <Metronome presetRate={120} />
      {songData.map((s) => {
        console.log(s);
        return < Song key={s.id} song={s} />;
      })}
      <SongForm />
    </main>
  );
}
