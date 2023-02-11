type TempoSetter = (rate: number) => void;

export default class TempoController {
    private static _tempoSetter: TempoSetter;

    public static setup(callback: TempoSetter) {
        TempoController._tempoSetter = callback;
    }

    public static setTempo(val: number) {
        if (TempoController._tempoSetter != null) {
            TempoController._tempoSetter(val);
        }
    }
}