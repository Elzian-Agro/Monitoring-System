import { useEffect, useRef } from 'react';

const ClickOutsideHandler = ({ children, callback }) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [callback]);

  return children(ref);
};

export default ClickOutsideHandler;
