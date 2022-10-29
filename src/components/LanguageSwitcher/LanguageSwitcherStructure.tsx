import { FC } from "react";
import { CheckClickOutside } from "../../utils/ClickOutside";
import Dropdown from "../Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: (flagsData: string, value?: boolean) => void;
   handleClickSwitcher: (value?: boolean) => void;
   toggleDropdown: boolean;
   flagsData: Array<string>;
   isMobile: RegExpMatchArray | null;
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick, handleClickSwitcher, toggleDropdown, flagsData, isMobile}) => {
    
  const dropdownProps = {
    data: flagsData,
    handleClick,
    handleClickSwitcher
  }
  return (
      <StyledContainer>
      {!toggleDropdown &&
        <StyledButton onMouseEnter={() => !isMobile && handleClickSwitcher()} onClick={() => handleClickSwitcher()}>
          <img src={flag} alt="Linkedin" />
        </StyledButton>}
      {toggleDropdown && 
      <CheckClickOutside onClickOutside={() => handleClickSwitcher(false)}>
        <Dropdown {...dropdownProps} />
        </CheckClickOutside>}
    </StyledContainer>
    )
} 

export default LanguageSwitcherStructure