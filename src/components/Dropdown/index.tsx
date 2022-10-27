import { FC } from "react";
import { FlagsData } from "../../data/dropdownData";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<FlagsData>;
  handleClick: (flagsData: FlagsData) => void;
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