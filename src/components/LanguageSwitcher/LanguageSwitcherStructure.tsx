import { FC } from "react";
import Dropdown from "../Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: (flagsData: string) => void;
   handleClickSwitcher: () => void;
   toggleDropdown: boolean;
   flagsData: Array<string>
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick, handleClickSwitcher, toggleDropdown, flagsData}) => {
    
  const dropdownProps = {
    data: flagsData,
    handleClick,
    handleClickSwitcher
  }
  return (
      <StyledContainer>
      {!toggleDropdown &&
        <StyledButton onMouseEnter={() => handleClickSwitcher()} onClick={() => handleClickSwitcher()}>
          <img src={flag} alt="Linkedin" />
        </StyledButton>}
      {toggleDropdown &&
        <Dropdown {...dropdownProps} />}
    </StyledContainer>
    )
} 

export default LanguageSwitcherStructure