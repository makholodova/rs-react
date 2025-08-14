'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const useLocalStorage = (
  key: string,
  defaultValue = ''
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const raw = window.localStorage.getItem(key);
    return raw ?? defaultValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prev = window.localStorage.getItem(key);
    if (prev !== value) {
      window.localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
