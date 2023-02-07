import { Song } from '@prisma/client';

export default class SongController {
    private static _instance: SongController;
    private constructor() { }

    public static getInstance(): SongController {
        if (this._instance == null)
            this._instance = new SongController();
        return this._instance;
    }

    async setSong(s: Song) {
        const info = await fetch(`${process.env.BASE_FETCH_URL}/api/createSong`, {
            method: 'POST',
            body: JSON.stringify(s),
        });
        if (info.ok === false)
            console.log(info.statusText);
    }

    async getSongs() {
        const info = await fetch(`${process.env.BASE_FETCH_URL}/api/getSongs`);
        if (info.ok) {
            return info.json();
        }
        return null;
    }

}




