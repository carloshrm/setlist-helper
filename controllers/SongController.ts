import { Song } from '@prisma/client';

export default class SongController {
    private static _instance: SongController;
    private setList: Record<number, Song> = {};
    private observers: Function[] = [];

    private constructor() { }

    public static getInstance(): SongController {
        if (this._instance == null)
            this._instance = new SongController();
        return this._instance;
    }

    private async fetchCall(endpoint: string, body: Song) {
        const info = await fetch(`${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (info.ok === false) {
            console.log(info.statusText);
            return null;
        }
        else {
            const newInfo = await info.json();
            return newInfo;
        }
    }

    async updateSong(s: Song) {
        const updatedSong = await this.fetchCall("/api/updateSong", s);
        if (updatedSong != null) {
            this.setList[updatedSong.id] = updatedSong;
            this.notifyAll();
        }

    }

    async deleteSong(s: Song) {
        const deletedSong = await this.fetchCall("/api/deleteSong", s);
        if (deletedSong != null) {
            delete this.setList[deletedSong.id];
            this.notifyAll();
        }
    }

    async createSong(s: Song) {
        const newSong = await this.fetchCall("/api/createSong", s);
        if (newSong != null) {
            this.setList[newSong.id] = newSong;
            this.notifyAll();
        }
    }

    async getAllSongs() {
        const info = await fetch("/api/getSongs");
        if (info.ok) {
            const dbSongs = await info.json() as Song[];
            this.setList = {};
            dbSongs.forEach(s => this.setList[s.id] = s);
            return Object.values(this.setList);
        }
        else
            return null;
    }

    setObserverCallback(callback: Function): void {
        this.observers.push(callback);
    }

    private notifyAll() {
        this.observers.forEach(o => o(Object.values(this.setList)));
    }
}




