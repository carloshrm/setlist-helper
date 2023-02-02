'use client';
import React, { useEffect, useState, type ReactElement } from 'react';
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

function rateToMilliseconds(val: number): number {
    return Math.round(1000 / (val / 60));
}

function Metronome(prop: { presetRate: number; }): ReactElement {
    const [tickCount, setTickCount] = useState(0);
    const [rate, setRate] = useState(prop.presetRate);
    const [intervalID, setIntervalID] = useState(-1);

    function stopClicking() {
        if (intervalID != -1)
            window.clearInterval(intervalID);
        else
            return;
    }

    function startClicking() {
        if (intervalID != -1)
            stopClicking();
        setIntervalID(window.setInterval(tick, rateToMilliseconds(rate)));
    }

    function tick() {
        setTickCount((t) => t + 1);
    }

    return (
        <>
            <label htmlFor="tslider">Choose your tempo: </label>
            {rate}
            <div>
                <input type="range" min={40} max={220} list="tlist" className={styles.slider} id="tslider" name="tslider" onChange={(e) => {
                    setRate(e.target.valueAsNumber);
                }} />
                <datalist id="tlist" className={styles.slider_list}>
                    {Array.from({ length: 20 }, (_, i) => (i + 1)).map((x, i) => {

                        if (i > 4)
                            return <option key={i} value={i * 10} label={Tempo[i * 10]}></option>;
                        else
                            return <p></p>;
                    }
                    )}
                </datalist>
            </div>


            <input placeholder='120' type="number" onChange={(e) => setRate(e.target.valueAsNumber)} />
            {tickCount}
            <div>
                <button onClick={startClicking} className={styles.metro_btn}>start</button>
                <button onClick={stopClicking}>stop</button>
            </div>
        </>
    );
}

export default Metronome;
