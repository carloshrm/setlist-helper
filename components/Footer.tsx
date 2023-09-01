export default function Footer() {
    return (<footer className='bg-stone-800 h-10 flex justify-between items-center w-full mx-auto p-2 bottom-0 border-t-2 border-stone-500'>
        <p className="text-xs">Made by <a className="text-xs text-stone-200 underline" href="https://www.linkedin.com/in/carloshrm/">Carlos Moraes</a>, 2023.</p>
        <a className="text-xs px-2 rounded bg-emerald-600" href="https://github.com/carloshrm/setlist-helper">Source</a>
    </footer>);
}