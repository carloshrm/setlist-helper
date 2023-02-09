import React, { type ReactElement } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface PopupProps {
  message: string;
  okCallback: Function;
  cclCallback: Function;
}

function Popup({ message, okCallback, cclCallback }: PopupProps): ReactElement {
  return (
    <div className='w-1/2 h-1/6 bg-stone-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between'>
      <div className='w-full bg-white flex items-center'><ExclamationCircleIcon className='mx-2 w-4 h-4 fill-red-700' /><p className='text-black mx-2'>Are you sure?</p></div>
      <h2 className='text-lg mx-2'>{message}</h2>
      <div className='self-end w-80 flex justify-between m-2'>
        <button onClick={() => cclCallback()} className='bg-emerald-900 px-2 py-1 mx-2'>Cancel</button>
        <button onClick={() => okCallback()} className='bg-emerald-900 px-2 py-1'> OK</button>
      </div>
    </div >
  );
}

export default Popup;