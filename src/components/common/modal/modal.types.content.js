import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const modalContent = {
  confirmation: (message, onClose, t) => {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex justify-center'>
          <ExclamationCircleIcon className='w-16 h-16 text-green-500' />
        </div>
        <p className='text-sm text-center text-black dark:text-white'>{t(message)}</p>
        <div className='flex gap-4 justify-center'>
          <button
            className={`cursor-pointer transition-all bg-red-500 border-red-600 text-white text-sm px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:translate-y-[1px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
            onClick={() => onClose(false)}>
            {t('NO')}
          </button>
          <button
            className={`cursor-pointer transition-all bg-blue-500 border-blue-600 text-white text-sm px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:translate-y-[1px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
            onClick={() => onClose(true)}>
            {t('YES')}
          </button>
        </div>
      </div>
    );
  },

  error: (message, onClose, t) => {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex justify-center'>
          <ExclamationCircleIcon className='w-16 h-16 text-red-500' />
        </div>
        <p className='text-sm text-center text-red-800 dark:text-white'>{t(message)}</p>
        <div className='flex p-2 justify-center'>
          <button
            className={`cursor-pointer transition-all text-white text-sm px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:translate-y-[1px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px] bg-red-500 border-red-600`}
            onClick={onClose}>
            {t('OK')}
          </button>
        </div>
      </div>
    );
  },

  alert: (message, onClose, t) => {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex justify-center'>
          <ExclamationCircleIcon className='w-16 h-16 text-green-500' />
        </div>
        <p className='text-sm text-center text-black dark:text-white'>{t(message)}</p>
        <div className='flex p-2 justify-center'>
          <button
            className={`cursor-pointer transition-all text-white text-sm px-4 py-1 rounded-lg border-b-[4px] hover:brightness-110 hover:translate-y-[1px] ative:border-b-[2px] active:brightness-90 active:translate-y-[2px] bg-blue-500 border-blue-600`}
            onClick={onClose}>
            {t('OK')}
          </button>
        </div>
      </div>
    );
  },
};
