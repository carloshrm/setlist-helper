'use client';
import TempoController from '@/controllers/TempoController';
import React, { OptionHTMLAttributes, useEffect, useState, type ReactElement } from 'react';
import { limits } from './Song';

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

export default function Metronome(): ReactElement {
    const [tickCount, setTickCount] = useState(-1);
    const [meter, setMeter] = useState<Meter>({ beats: 4, measure: 4 });
    const [runTime, setTime] = useState(Date.now());
    const [rate, setRate] = useState(120);
    const [intervalID, setIntervalID] = useState(-1);

    let highClick: HTMLAudioElement | null;
    let lowClick: HTMLAudioElement | null;
    if (typeof window !== "undefined") {
        highClick = document.getElementById("high_click") as HTMLAudioElement;
        lowClick = document.getElementById("low_click") as HTMLAudioElement;
    }

    useEffect(() => {
        TempoController.tempoSetup((n: number) => setTempo(n.toString()));
        setTimeSig(meter);
        setTempo(rate.toString());
    }, []);

    useEffect(() => {
        if (intervalID != -1)
            startClicking();
    }, [rate, meter]);

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
        setIntervalID(window.setInterval(tick, rateToMilliseconds(meter.measure == 8 ? rate * 2 : rate)));
    }

    function tick(): void {
        let display = document.getElementById("tempodisplay");
        display?.classList.toggle("bg-emerald-900");
        setTickCount((t) => {
            if (meter.measure != 8) {
                if (t % meter.beats + 1 == meter.beats)
                    accent();
                else
                    beat();
            } else {
                if (t % meter.beats + 1 == meter.beats || (t % meter.beats + 1) == (meter.measure / 2) - 1)
                    accent();
                else
                    beat();
            }
            return t + 1;
        });
    }

    function accent() {
        if (highClick == null) return;

        if (highClick.ended) {
            highClick.currentTime = 0;
            highClick.play();
        }
        else
            audioStutterFix(highClick);
    }

    function beat() {
        if (lowClick == null) return;

        if (lowClick.ended) {
            lowClick.currentTime = 0;
            lowClick.play();
        }
        else
            audioStutterFix(lowClick);
    }

    function audioStutterFix(e: HTMLAudioElement) {
        const support = e.cloneNode() as HTMLAudioElement;
        support.volume = e.volume;
        support.play();
    }

    function setTempo(val: string): void {
        let list = document.getElementById("tlist") as HTMLInputElement;
        let range = document.getElementById("tslider") as HTMLInputElement;

        let selectedValue: number = 0;
        try {
            selectedValue = parseInt(val);
        } catch (error) {
            console.log(error);
        }
        let selectedTempo = Tempo[selectedValue];



        if (list != null) {
            if (selectedTempo != undefined) {
                list.value = val;
            }
            else {
                let rounding = selectedValue;
                let i = -1;
                while (selectedTempo === undefined) {
                    selectedTempo = Tempo[(rounding += i)];
                    if (rounding <= 0)
                        i = 1;
                }

                let extraHtmlElement: HTMLOptionElement = document.getElementById("freeoption") as HTMLOptionElement;
                extraHtmlElement.label = `~~${selectedTempo} :: ${selectedValue}`;
                extraHtmlElement.value = val;
                extraHtmlElement.hidden = false;
                list.value = val;
            }
        }

        if (range.value != val)
            range.value = val;

        setRate(parseInt(val));
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
        if (intervalID === -1)
            return "00:00:00";
        else {
            let offsetDate = new Date(Date.now() - runTime);
            let seconds = offsetDate.getUTCSeconds();
            let minutes = offsetDate.getUTCMinutes();
            let hours = offsetDate.getUTCHours();
            return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        }
    }

    return (
        <div className='flex flex-col w-full xl:w-1/3 p-2 lg:px-8 lg:py-4 bg-stone-800'>
            {/* bpm and time text header */}
            <h1 className='text-4xl mb-4'>Metronome</h1>
            <p><span className='font-bold'>{rate}</span> BPM</p>
            <p>{makeTimeString()}</p>
            {/* tempo slider */}
            <input type="range" min={limits.minBPM} max={limits.maxBPM} className={"range accent-emerald-500 my-4 "} id="tslider" name="tslider" onChange={(e) => setTempo(e.target.value)} />
            {/* tempo dropdown and measure select */}
            <div className='flex justify-center my-4 h-10'>
                <select id="tlist" className="bg-stone-900 p-2" onChange={(e) => { setTempo(e.target.value); }}>
                    {Object.entries(Tempo).map(([k, v]) => <option key={v} value={k} label={v + " :: " + k}></option>)}
                    <option id='freeoption' key={-1} value={-1} label={" :: "} hidden></option>
                </select>
                <div className='flex flex-col align-middle justify-evenly mx-4 p-2'>
                    <select className='bg-stone-900 text-center' name="meterbeats" id="meterbeats" onChange={(e) => setTimeSig({ beats: parseInt(e.target.value), measure: meter.measure })}>
                        {[...Array(21)].map((v, i) => <option key={i} value={i + 1} label={(i + 1).toString()}></option>)}
                    </select>
                    <select className='bg-stone-900 text-center' name="metermeasure" id="metermeasure" onChange={(e) => setTimeSig({ beats: meter.beats, measure: parseInt(e.target.value) })}>
                        <option value="2" label='2'>2</option>
                        <option value="4" label='4'>4</option>
                        <option value="8" label='8'>8</option>
                    </select>
                </div>
            </div>
            {/* counter */}
            <div className='p-4 my-6 bg-stone-900 bg-emerald-900' id='tempodisplay'>
                <h1 className='text-6xl text-center font-bold'>{(tickCount % meter.beats) + 1}</h1>
            </div>
            {/* controls */}
            <div className='flex justify-center'>
                <button onClick={startClicking} className={"px-8 py-2 mx-2 rounded-full font-bold " + (intervalID == -1 ? "bg-emerald-600" : "bg-emerald-800")}>start</button>
                <button onClick={stopClicking} className="px-8 py-2 mx-2 bg-emerald-600 rounded-full font-bold">stop</button>
                <div className='flex w-50 mt-4 justify-center px-2 scale-75 self-start'>
                    <p>vol</p>
                    <input className="w-2/3 xl:min-w-full mx-2 accent-gray-400" type="range" name="volume" id="volume" min={0} max={1} step={0.1} onChange={(e) => {
                        if (highClick != null && lowClick != null) {
                            highClick.volume = e.target.valueAsNumber;
                            lowClick.volume = e.target.valueAsNumber;
                        }
                    }} />
                </div>
            </div>
            {/* audio sounds (hidden) */}
            <audio hidden preload='auto' src="/sounds/high_click.wav" id='high_click'></audio>
            <audio hidden preload='auto' src="/sounds/low_click.wav" id='low_click'></audio>
        </div>
    );
}