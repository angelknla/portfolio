import { FC, ReactNode, useEffect, useRef } from "react";

interface ClickOutsideProps {
  onClickOutside: () => void;
  children: ReactNode
}
export const CheckClickOutside: FC<ClickOutsideProps> = ({onClickOutside, children}) => {

  const ref = useRef<HTMLDivElement>(null);  

   const handleClickOutside = (e: { target: any; }) => {
   if (ref.current && !ref.current.contains(e.target)) {
     onClickOutside();
   }

  };  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside,true);
    return () => {
      document.removeEventListener('click', handleClickOutside,true);
    }
  });

  if (!children) {
    return null;
  }
  return <div draggable={true} ref={ref}>{children}</div> 
}