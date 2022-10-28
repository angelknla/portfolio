import { FC } from "react";
import { FlagsData } from "../../data/dropdownData";
import DropdownStructure from "./DropdownSructure";

export interface DropdownProps {
  data: Array<FlagsData>;
  handleClick: (flagsData: FlagsData) => void;
  handleClickSwicther: () => void;
}

const Dropdown: FC<DropdownProps> = ({data, handleClick, handleClickSwicther}) => {

    const dropdownProps = {
       data,
       handleClick,
       handleClickSwicther,
    }
    return (
        <DropdownStructure {...dropdownProps} />
    )
}

export default Dropdown;