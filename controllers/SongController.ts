import { Song } from '@prisma/client';
import Controller from './Controller';

export default class SongController extends Controller<Song> {
    private static _instance: SongController;
    private setList: Record<number, Song> = {};
    private observers: Function[] = [];

    private constructor() {
        super();
        console.log("instanced song controller");
    }

    public static getInstance(): SongController {
        if (this._instance == null)
            this._instance = new SongController();
        return this._instance;
    }

    public async updateSong(s: Song) {
        const updatedSong = await this.fetchCall("/api/song/updateSong", s);
        if (updatedSong != null) {
            this.setList[updatedSong.id] = updatedSong;
            this.notifyAll();
        }
    }

    public async deleteSong(s: Song) {
        const deletedSong = await this.fetchCall("/api/song/deleteSong", s);
        if (deletedSong != null) {
            delete this.setList[deletedSong.id];
            this.notifyAll();
        }
    }

    public async createSong(s: Song) {
        const newSong = await this.fetchCall("/api/song/createSong", s);
        if (newSong != null) {
            this.setList[newSong.id] = newSong;
            this.notifyAll();
        }
    }

    public async getAllSongs() {
        const info = await fetch("/api/song/getAllSongs");
        if (info.ok) {
            const dbSongs = await info.json() as Song[];
            this.setList = {};
            dbSongs.forEach(s => this.setList[s.id] = s);
            return Object.values(this.setList);
        }
        else
            return null;
    }

    public setObserverCallback(callback: Function): void {
        this.observers.push(callback);
    }

    private notifyAll() {
        this.observers.forEach(o => o(Object.values(this.setList)));
    }
}




