import { FC, ReactNode, useCallback, useEffect, useRef } from "react";

interface ClickOutsideProps {
  onClickOutside: () => void;
  children: ReactNode;
}
export const CheckClickOutside: FC<ClickOutsideProps> = ({
  onClickOutside,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Handle click outside of the component
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!children) {
    return null;
  }
  return (
    <div draggable={true} ref={ref}>
      {children}
    </div>
  );
};
