import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useLocalStorage from '../hooks/use-local-storage';

describe('useLocalStorage hook', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the value from localStorage if it exists', () => {
    localStorage.setItem(key, JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage(key, 'default-value'));

    expect(result.current[0]).toBe('stored-value');
  });

  it('should use the default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default-value'));

    expect(result.current[0]).toBe('default-value');
  });

  it('should update the value and store it in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial-value'));

    act(() => {
      result.current[1]('updated-value');
    });

    expect(result.current[0]).toBe('updated-value');
    expect(localStorage.getItem(key)).toBe(JSON.stringify('updated-value'));
  });

  it('should default to an empty string if no default is provided', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem(key)).toBe(JSON.stringify(''));
  });
});
