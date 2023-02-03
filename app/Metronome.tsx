'use client';
import React, { ChangeEvent, useEffect, useState, type ReactElement } from 'react';
import styles from "./Metronome.module.css";

const Tempo: { [key: number]: string; } = {
    40: "Grave",
    50: "Largo",
    60: "Lento",
    70: "Adagio",
    78: "Adagietto",
    80: "Andante",
    88: "Andantino",
    98: "Moderato",
    110: "Allegretto",
    120: "Allegro",
    150: "Molto",
    160: "Vivace",
    170: "Vivacissimo",
    175: "Allegrissimo",
    190: "Presto",
    220: "Prestissimo",
};

interface Meter {
    beats: number,
    measure: number;
}


function rateToMilliseconds(val: number): number {
    return Math.round(1000 / (val / 60));
}

function Metronome(prop: { presetRate: number; presetMeter?: Meter; }): ReactElement {
    const [tickCount, setTickCount] = useState(0);
    const [meter, setMeter] = useState<Meter>({ beats: 4, measure: 4 });
    const [runTime, setTime] = useState(Date.now());
    const [rate, setRate] = useState(0);
    const [intervalID, setIntervalID] = useState(-1);

    useEffect(() => {
        setTempo(prop.presetRate.toString());
        setTimeSig(prop.presetMeter ?? meter);
    }, []);


    function stopClicking(): void {
        if (intervalID != -1) {
            window.clearInterval(intervalID);
            setIntervalID(-1);
        }
        else
            return;
    }

    function startClicking(): void {
        if (intervalID != -1)
            stopClicking();
        else
            setTime(Date.now());
        setIntervalID(window.setInterval(tick, rateToMilliseconds(rate)));
    }

    function tick(): void {
        setTickCount((t) => t + 1);
        let display = document.getElementById("tempodisplay");
        display?.classList.toggle("bg-black");
    }

    function setTempo(val: string): void {
        let list = document.getElementById("tlist") as HTMLInputElement;
        let range = document.getElementById("tslider") as HTMLInputElement;
        let selected = Tempo[parseInt(val)];

        if (selected != undefined && list != null)
            list.value = val;

        if (range.value != val)
            range.value = val;

        setRate(parseInt(val));
        if (intervalID != -1)
            startClicking();
    }

    function setTimeSig(m: Meter): void {
        let beats = document.getElementById("meterbeats") as HTMLInputElement;
        let measure = document.getElementById("metermeasure") as HTMLInputElement;
        if (beats.valueAsNumber != m.beats)
            beats.value = m.beats.toString();
        if (measure.valueAsNumber != m.measure)
            measure.value = m.measure.toString();

        setMeter(m);
    }

    function makeTimeString(): string {
        let offsetDate = new Date(Date.now() - runTime);
        let seconds = offsetDate.getUTCSeconds();
        let minutes = offsetDate.getUTCMinutes();
        let hours = offsetDate.getUTCHours();
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    return (
        <div className='flex flex-col'>
            <p>Choose your tempo: {rate}</p>
            <p>Time: {makeTimeString()}</p>
            <div>
                <input type="range" min={40} max={220} className={styles.slider} id="tslider" name="tslider" onChange={(e) => setTempo(e.target.value)} />
            </div>
            <select id="tlist" className={styles.slider_list} onChange={(e) => { setTempo(e.target.value); }}>
                {Object.entries(Tempo).map(([k, v]) => <option key={v} value={k} label={v + " :: " + k}></option>)}
            </select>
            <div>
                <select name="meterbeats" id="meterbeats" onChange={(e) => setMeter((p) => {
                    return { beats: parseInt(e.target.value), measure: p.measure };
                })}>
                    {[...Array(21)].map((v, i) => <option key={i} value={i + 1} label={(i + 1).toString()}></option>)}
                </select>
                <select name="metermeasure" id="metermeasure" onChange={(e) => setMeter((p) => {
                    return { beats: p.beats, measure: parseInt(e.target.value) };
                })}>
                    <option value="2" label='2'>2</option>
                    <option value="4" label='4'>4</option>
                    <option value="8" label='8'>8</option>
                </select>
            </div>
            <div className='p-6 bg-slate-200' id='tempodisplay'>
                <p>{(tickCount % meter.beats) + 1}</p>
            </div>
            <div className='flex justify-center'>
                <button onClick={startClicking} className="px-8 py-2 mx-2 bg-lime-400 rounded-full font-bold">start</button>
                <button onClick={stopClicking} className="px-8 py-2 mx-2 bg-lime-400 rounded-full font-bold">stop</button>
            </div>
        </div>
    );
}

export default Metronome;
