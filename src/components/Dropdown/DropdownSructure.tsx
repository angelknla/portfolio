import { FC } from "react";
import { DropdownContainer, DropdownContent, StyledButton } from "./DropdownStyles";

interface DropdownStructureProps {
  data: Array<string>;
  handleClick: () => void;
}

const DropdownStructure: FC<DropdownStructureProps> = ({data, handleClick}) => {
    return (
        <DropdownContainer>
            <DropdownContent>
            {data.map((flag) => (
              <StyledButton onClick={() => handleClick()} >
                <img src={flag} alt="language" />
             </StyledButton>
            ))}
            </DropdownContent>
        </DropdownContainer>
    )
}

export default DropdownStructure;