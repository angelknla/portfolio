import { FC } from "react";
import Dropdown from "../Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: () => void;
   handleClickSwicther: () => void;
   toggleDropdown: boolean;
   flagsData: Array<string>
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick, handleClickSwicther, toggleDropdown, flagsData}) => {
    return (
      <StyledContainer>
       {!toggleDropdown &&
        <StyledButton onClick={() => handleClickSwicther()}>
         <img src={flag} alt="Linkedin" />
        </StyledButton>
        }
        {toggleDropdown && 
          <Dropdown 
            data={flagsData}
            handleClick={handleClick} 
          />
        }
      </StyledContainer>
    )
} 

export default LanguageSwitcherStructure