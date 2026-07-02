import { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * @param ref - React ref object for the element to detect outside clicks
 * @param handler - Function to call when clicking outside
 * @param enabled - Whether the hook is active (default: true)
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

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
