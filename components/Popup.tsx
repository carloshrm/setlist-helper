import React, { useEffect, useRef, type ReactElement } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface PopupProps {
  okCallback: Function;
  cclCallback: Function;
}

function Popup({ okCallback, cclCallback }: PopupProps): ReactElement {
  return (
    <div className='w-full bg-white flex items-center'>
      <ExclamationCircleIcon className='mx-2 w-4 h-4 fill-red-700' />
      <p className='text-black mx-1'>Are you sure?</p>
      <div className='ml-auto my-1 mx-2'>
        <button onClick={() => cclCallback()} className='bg-emerald-900 px-2 mx-2'>Cancel</button>
        <button onClick={() => okCallback()} className='bg-emerald-900 px-2'> OK</button>
      </div>
    </div >
  );
}

export default Popup;