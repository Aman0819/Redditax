import { useEffect, useCallback } from 'react';

function useDebounce(effect, deps, delay = 250) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
  return callback;
}

export default useDebounce;
