import { FC } from "react";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: () => void;
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick}) => {
    return (
      <StyledContainer>
        <StyledButton onClick={() => handleClick()}>
         <img src={flag} alt="Linkedin" />
        </StyledButton>
      </StyledContainer>
    )
} 

export default LanguageSwitcherStructure