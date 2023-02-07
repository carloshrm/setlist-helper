'use client';
import { Song } from '@prisma/client';
import React, { useState, type ReactElement } from 'react';
import { limits as songLimits } from '../components/Song';
import SongController from '../controllers/SongController';
import styles from "./SongForm.module.css";

function SongForm(): ReactElement {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [bpm, setBpm] = useState(60);
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h1>test</h1>
            <form action="" id='song_input_form' className={styles.input_form}>
                <fieldset>
                    <legend>Add a new Song: </legend>

                    <label htmlFor="title_in">Title</label>
                    <input type="text" name="title_in" id="title_in" onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="cmnt_in">Comments</label>
                    <input type="text" name="cmnt_in" id="cmnt_in" />

                    <label htmlFor="bpm_in">BPM</label>
                    <input type="number" min={songLimits.minBPM} max={songLimits.maxBPM} name="bpm_in" id="bpm_in" />

                </fieldset>
                <button className='bg-red-900' type='button' onClick={(e) => {
                    const info = new FormData(document.getElementById("song_input_form") as HTMLFormElement);
                    const newSong: ISong = {
                        id: -1,
                        title: info.get('title_in')?.toString() || "No title",
                        comments: info.get('cmnt_in')?.toString() || "No comments",
                        bpm: parseInt(info.get('bpm_in')?.toString() || "60"),
                        date: new Date()
                    };
                    SongController.getInstance().setSong(newSong);
                }}>Add</button>
            </form>

        </div >
    );
}

export default SongForm;