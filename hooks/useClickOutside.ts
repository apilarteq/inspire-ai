import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  onClickOutside: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("pointerdown", handleClick);
    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [onClickOutside]);

  return ref;
}
