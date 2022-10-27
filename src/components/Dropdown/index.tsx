import { FC } from "react";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<string>;
  handleClick: () => void;
}

const Dropdown: FC<DropdownProps> = ({data, handleClick}) => {

    const dropdownProps = {
       data,
       handleClick,
    }
    return (
        <DropdownStructure {...dropdownProps} />
    )
}

export default Dropdown;