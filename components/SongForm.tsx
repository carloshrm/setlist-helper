'use client';
import { Song } from '@prisma/client';
import React, { useEffect, useState, type ReactElement } from 'react';
import { limits as songLimits } from './Song';
import SongController from '../controllers/SongController';
import styles from "./SongForm.module.css";

interface FormProps {
    song?: Song;
    cclCallback: Function;
}

function SongForm({ song, cclCallback }: FormProps): ReactElement {
    const [title, setTitle] = useState(song === undefined ? "" : song.title);
    const [comment, setComment] = useState(song === undefined ? "" : (song.comments || ""));
    const [bpm, setBpm] = useState(song === undefined ? 60 : song.bpm);
    const [date, setDate] = useState(song === undefined ? new Date() : new Date(song.date_added));

    return (
        <div className='w-1/2 h-fit border-2 border-emerald-900 bg-stone-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between px-4 py-2'>
            <form action="" id='song_input_form' className={styles.input_form}>
                <fieldset>
                    <legend>{song === undefined ? "Add a new Song: " : "Edit: "}</legend>

                    <label htmlFor="title_in">Title</label>
                    <input type="text" name="title_in" id="title_in" value={title} placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="cmnt_in">Comments</label>
                    <input type="text" name="cmnt_in" id="cmnt_in" value={comment} placeholder="Comments"
                        onChange={(e) => {
                            setComment(e.target.value);
                        }} />

                    <label htmlFor="bpm_in">BPM</label>
                    <input type="number"
                        min={songLimits.minBPM}
                        max={songLimits.maxBPM}
                        name="bpm_in"
                        id="bpm_in"
                        value={bpm}
                        onKeyDown={(e) => {
                            const valid = Array(10).fill(null).map((val, i) => i.toString());
                            valid.push('Backspace');
                            if (!valid.includes(e.key)) {
                                e.preventDefault();
                            }

                        }}
                        onChange={(e) => {
                            if (Number(e.target.value))
                                setBpm(e.target.valueAsNumber);
                            else {
                                e.target.value = bpm.toString();
                            }
                        }} />

                    <label htmlFor="date_in">Date Started:</label>
                    <input type="date" name="date_in" id="date_in" value={
                        date.toISOString().slice(0, date.toISOString().indexOf("T"))
                    }
                        onChange={(e) => {
                            const value = e.target.valueAsDate;
                            if (value != null && value < (new Date())) {
                                setDate(value);
                            }
                        }} />

                </fieldset>

                <button className='bg-emerald-900 px-2' type='button' onClick={(e) => {
                    const formInput = new FormData(document.getElementById("song_input_form") as HTMLFormElement);
                    let bpmVal = parseInt(formInput.get('bpm_in')?.toString() || "60");
                    bpmVal = bpmVal < 40 ? 40 : bpmVal > 220 ? 220 : bpmVal;
                    const newSongInfo: Song = {
                        id: -1,
                        title: formInput.get('title_in')?.toString() || "No title",
                        comments: formInput.get('cmnt_in')?.toString() || "No comments",
                        bpm: bpmVal,
                        date_added: date,
                        userId: null
                    };
                    if (song === undefined)
                        SongController.getInstance().createSong(newSongInfo);
                    else {
                        song.title = newSongInfo.title;
                        song.comments = newSongInfo.comments;
                        song.date_added = newSongInfo.date_added;
                        song.bpm = newSongInfo.bpm;
                        SongController.getInstance().updateSong(song);
                    }
                    cclCallback();
                }}>Add</button>

                <button className='bg-emerald-900 mx-4 my-2 px-2' onClick={() => cclCallback()}>Cancel</button>
            </form>

        </div>
    );
}

export default SongForm;