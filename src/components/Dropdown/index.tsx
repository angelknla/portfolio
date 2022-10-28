import { FC, useEffect, useRef } from "react";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<string>;
  handleClick: (flagsData: string) => void;
  handleClickSwitcher: () => void;
}

const Dropdown: FC<DropdownProps> = ({data, handleClick, handleClickSwitcher}) => {

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  });

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: { target: any; }) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handleClickSwitcher();
    }
  };

  const dropdownProps = {
    data,
    handleClick,
    handleClickSwitcher,
    ref,
  }
  return (
    <DropdownStructure {...dropdownProps} />
  )
}

export default Dropdown;