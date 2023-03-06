import { Song } from "@prisma/client";
import { SetStateAction } from "react";

type TempoSetter = (rate: number) => void;

export default class TempoController {
    private static _tempoSetter: TempoSetter;
    private static _activeSetter: React.Dispatch<SetStateAction<number>>;

    public static tempoSetup(callback: TempoSetter) {
        TempoController._tempoSetter = callback;
    }

    public static activeSetup(callback: React.Dispatch<SetStateAction<number>>) {
        TempoController._activeSetter = callback;
    }

    public static setTempo(s: Song) {
        if (TempoController._tempoSetter != null) {
            TempoController._tempoSetter(s.bpm);
        }
        if (TempoController._activeSetter != null) {
            TempoController._activeSetter(s.id);
        }
    }
}