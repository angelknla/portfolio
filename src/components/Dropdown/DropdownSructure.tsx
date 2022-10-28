import { FC, RefObject } from "react";
import { FlagsData } from "../../data/dropdownData";
import { DropdownContainer, DropdownContent, StyledButton } from "./DropdownStyles";

interface DropdownStructureProps {
  data: Array<FlagsData>;
  handleClick: (flagsData: FlagsData) => void;
  handleClickSwitcher: () => void;
  ref: RefObject<HTMLDivElement> | null ;
}

const DropdownStructure: FC<DropdownStructureProps> = ({data, handleClick, handleClickSwitcher, ref}) => {
    return (
        <DropdownContainer >
            <DropdownContent onMouseLeave={() => handleClickSwitcher()}>
            {data.map((flag, i) => (
              <StyledButton id="flagButton" key={i} onClick={() => handleClick(flag)} >
                <img src={flag.flag} alt="language" />
             </StyledButton>
            ))}
            </DropdownContent>
        </DropdownContainer>
    )
}

export default DropdownStructure;