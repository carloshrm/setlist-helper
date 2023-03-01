export default function UserBar(props: { userID: string | undefined; setUserCallback: Function; saveCallback: Function; }) {

    async function saveInfo() {
        if (props.userID === undefined) {
            const newID = makeId();
            saveID(newID);
            props.setUserCallback(newID);
        }
        props.saveCallback();
    }

    async function saveID(id: string) {
        const info = await fetch(`${process.env.BASE_URL}$"/api/user/createUser`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
        });
    }

    function makeId(): string {
        return Math.random().toString().slice(2, 10);
    }

    return (
        <div>
            <p>{props.userID === undefined ? "Unsaved Session" : `Session ID: ${props.userID}`}</p>
            <button onClick={saveInfo}>Save</button>
            <button onClick={props.setUserCallback("1")}>Load</button>
        </div>
    );
}