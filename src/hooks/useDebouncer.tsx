import { useState, useEffect } from "react";

/**
 * Custom debounce hook that delays updating the value until after a given delay.
 * @param value The input value to debounce.
 * @param delay The delay in milliseconds before updating the value.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
