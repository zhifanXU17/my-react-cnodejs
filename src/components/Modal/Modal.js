import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { useRef, useEffect } from 'react';

function Modal({ handleDismiss, title, children }) {
  const closeBtnRef = useRef();

  useEffect(() => {
    const currentlyFocusedElem = document.activeElement;

    closeBtnRef.current.focus();

    return () => {
      currentlyFocusedElem?.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        handleDismiss();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss]);

  return (
    <FocusLock>
      <RemoveScroll>
        <div className='fixed inset-0 grid place-content-center'>
          <div
            className='absolute inset-0 bg-backdrop'
            onClick={handleDismiss}
          />

          <div
            className='card w-96 bg-base-100'
            role='dialog'
            aria-modal='true'
            aria-label={title}
          >
            <div className='card-body'>
              <h2 className='card-title'>{title}</h2>
              {children}
              <div className='card-actions justify-end'>
                <button
                  className='absolute top-[-2rem] right-2 text-base-100'
                  ref={closeBtnRef}
                  onClick={handleDismiss}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}

export default Modal;
