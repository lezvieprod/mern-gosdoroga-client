import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

export const useRedirectTimer = (path: string) => {

  const history = useHistory()
  const [initialTime, setInitialTime] = useState<number>(0);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    }

    if (initialTime === 0 && startTimer) {
      history.push(path)
      setStartTimer(false);
    }
  }, [initialTime, startTimer, history, path]);

  return { setInitialTime, setStartTimer, initialTime } as const
}