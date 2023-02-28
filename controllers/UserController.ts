import { User } from "@prisma/client";
import { cookies } from 'next/headers';
import Controller from "./Controller";

export default class UserController extends Controller<User> {
    private static _instance: UserController;
    private userID: string;

    private constructor() {
        super();
        console.log("instanced user ctrl");
        this.userID = cookies().get("userid")?.value || this.makeId();
    }

    public static getInstance(): UserController {
        if (this._instance == null)
            this._instance = new UserController();
        return this._instance;
    }

    private makeId(): string {
        const newID = Math.random().toString().slice(2, 10);
        this.syncId(newID);
        return newID;
    }

    public async getUser(): Promise<User> {
        const info = await fetch(`${process.env.BASE_URL}/api/user/getUser`, {
            method: 'GET',
            headers: {
                cookie: this.userID
            }
        });
        if (info.ok) {
            const dbUser = await info.json() as User;
            return dbUser;
        } else {
            // user was supposed to be found but was not, invalid id in cookie
            return { id: this.makeId() } as User;
        }
    }

    public setId(id: string) {
        // TODO - validate
        this.userID = id;
    }

    public async syncId(id: string) {
        const newUser = await this.fetchCall("/api/user/createUser", { id });

    }
}