

export default function User(props: { userID: string | undefined; setUserCallback: Function; saveCallback: Function; }) {

    async function saveInfo() {
        let newID = undefined;
        if (props.userID === undefined) {
            newID = makeId();
            await saveID(newID);
            await props.setUserCallback(newID);
        }
        else
            newID = props.userID;
        props.saveCallback(newID);
    }

    async function saveID(id: string) {
        const info = await fetch(`/api/user/createUser`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
        });
    }

    async function deleteUser(userID: string) {
        const info = await fetch(`/api/user/deleteUser`, {
            method: 'POST',
            body: JSON.stringify({ id: userID }),
        });
        if (info.ok) {
            document.cookie += ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            location.reload();
        }
    }

    async function checkUserExists(userID: string): Promise<Boolean> {
        const dbUser = await fetch(`/api/user/getUser`, {
            method: 'POST',
            body: userID
        });
        return dbUser.ok;
    }

    function makeId(): string {
        return Math.random().toString().slice(2, 10);
    }

    return (
        <div className="my-4 border-t-2">
            <p className="text-sm m-2">{props.userID === undefined ? "Unsaved Session" : `Session ID: ${props.userID}`}</p>
            <button className='px-2 mx-2 border-2 bg-stone-900' onClick={saveInfo}>Save</button>
            <button className='px-2 mx-2 border-2 bg-stone-900' onClick={async () => {
                const previousSession = prompt("Enter a session ID to load a setlist...");
                if (previousSession != null) {
                    if (await checkUserExists(previousSession)) {
                        props.setUserCallback(previousSession);
                    } else {
                        alert("Invalid session ID");
                    }
                }
            }
            }>Load</button>
            <button className='px-2 mx-2 border-2 bg-stone-900' onClick={() => {
                if (props.userID != undefined) {
                    if (confirm("Deleting your session will erase all your info from our servers, including your setlist, are you sure?"))
                        deleteUser(props.userID);
                }
            }}>Delete</button>
        </div>
    );
}