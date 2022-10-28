import { FC } from "react";
import { FlagsData } from "../../data/dropdownData";
import Dropdown from "../Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: (flagsData: FlagsData) => void;
   handleClickSwicther: () => void;
   toggleDropdown: boolean;
   flagsData: Array<FlagsData>
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick, handleClickSwicther, toggleDropdown, flagsData}) => {
    
  const dropdownProps = {
    data: flagsData,
    handleClick,
    handleClickSwicther,
  }
  return (
      <StyledContainer>
       {!toggleDropdown &&
        <StyledButton onClick={() => handleClickSwicther()}>
         <img src={flag} alt="Linkedin" />
        </StyledButton>
        }
        {toggleDropdown && 
          <Dropdown {...dropdownProps}
          />
        }
      </StyledContainer>
    )
} 

export default LanguageSwitcherStructure