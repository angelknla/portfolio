import { FC } from "react";
import { FlagsData } from "../../data/dropdownData";
import { DropdownContainer, DropdownContent, StyledButton } from "./DropdownStyles";

interface DropdownStructureProps {
  data: Array<FlagsData>;
  handleClick: (flagsData: FlagsData) => void;
}

const DropdownStructure: FC<DropdownStructureProps> = ({data, handleClick}) => {
    return (
        <DropdownContainer>
            <DropdownContent>
            {data.map((flag, i) => (
              <StyledButton key={i} onClick={() => handleClick(flag)} >
                <img src={flag.flag} alt="language" />
             </StyledButton>
            ))}
            </DropdownContent>
        </DropdownContainer>
    )
}

export default DropdownStructure;