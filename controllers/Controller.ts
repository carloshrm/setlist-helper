export default abstract class Controller<T> {

    protected async fetchCall(endpoint: string, body: T) {
        const info = await fetch(`${process.env.BASE_URL}${endpoint}`, {
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
}