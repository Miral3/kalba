import { useEffect, useRef } from "react";

const useClickAway = (handler) => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e) => {
      if (!element.contains(e.target)) {
        savedHandler.current(e);
      }
    };

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
