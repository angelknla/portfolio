import { FC } from "react";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<string>;
  handleClick: (flagsData: string, value?:boolean) => void;
  handleClickSwitcher: (value?: boolean) => void;
}

const Dropdown: FC<DropdownProps> = ({data, handleClick, handleClickSwitcher}) => {

  const dropdownProps = {
    data,
    handleClick,
    handleClickSwitcher,
  }
  return (
    <DropdownStructure {...dropdownProps} />
  )
}

export default Dropdown;