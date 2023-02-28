import UserController from '@/controllers/UserController';

export default async function UserHeader() {
    const userID = await UserController.getInstance().getUser();

    return (
        <div>
            {
                typeof window !== undefined ? (() => document.cookie = `userid=${userID}; SameSite=None; Secure`)() : ""
            }
            <p>{userID.id}</p>
        </div>
    );
}