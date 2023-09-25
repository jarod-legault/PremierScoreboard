import {useEffect, useRef} from 'react';

export function useFirstRenderIsComplete() {
  const firstRenderIsCompleteRef = useRef(false);

  useEffect(() => {
    firstRenderIsCompleteRef.current = true;
  }, []);

  return {firstRenderIsComplete: firstRenderIsCompleteRef.current};
}
