import { useEffect, RefObject } from "react";

/**
 * Hook para detectar clics fuera de un elemento de forma portable.
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: Event) => void,
  enabled: boolean = true
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
