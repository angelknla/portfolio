import { FC, useEffect, useRef } from "react";
import { FlagsData } from "../../data/dropdownData";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<FlagsData>;
  handleClick: (flagsData: FlagsData) => void;
  handleClickSwitcher: () => void;
}

const Dropdown: FC<DropdownProps> = ({data, handleClick, handleClickSwitcher}) => {

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

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