// frontend/src/utils/useAutoScrollOnDragStart.ts
import { useCallback } from "react";
import { useResponsive } from "../hooks/useResponsive";
import useSmoothScroll from "./smoothScroll";

interface AutoScrollProps {
  scrollTo: string;
  offset?: number;
}

const useAutoScrollOnDragStart = ({
  scrollTo,
  offset = 0,
}: AutoScrollProps) => {
  const smoothScroll = useSmoothScroll();
  const { isMobile } = useResponsive();

  const onDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
      id: number
    ) => {
      if (!isMobile) {
        // Solo en desktop (drag) setear effectAllowed
        if ("dataTransfer" in e && e.dataTransfer) {
          e.dataTransfer.effectAllowed = "move";
        }
      }
      smoothScroll(scrollTo, offset);
    },
    [smoothScroll, scrollTo, offset, isMobile]
  );

  return { onDragStart };
};

export default useAutoScrollOnDragStart;
