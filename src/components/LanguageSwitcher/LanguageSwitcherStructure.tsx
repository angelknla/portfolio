import { FC } from "react";
import { CheckClickOutside } from "../../utils/ClickOutside";
import Dropdown from "../Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

interface LanguageSwictherStructureProps {
   flag: string;
   handleClick: (flagsData: string, value?: boolean) => void;
   handleClickSwitcher: (value?: boolean) => void;
   toggleDropdown: boolean;
   flagsData: Array<string>
}

const LanguageSwitcherStructure: FC<LanguageSwictherStructureProps> = ({flag, handleClick, handleClickSwitcher, toggleDropdown, flagsData}) => {
    
  const dropdownProps = {
    data: flagsData,
    handleClick,
    handleClickSwitcher
  }
  console.log(toggleDropdown)
  return (
    <CheckClickOutside onClickOutside={() => handleClickSwitcher(false)}>
      <StyledContainer>
      {!toggleDropdown &&
        <StyledButton onMouseEnter={() => handleClickSwitcher()} onClick={() => handleClickSwitcher(true)}>
          <img src={flag} alt="Linkedin" />
        </StyledButton>}
      {toggleDropdown &&
        <Dropdown {...dropdownProps} />}
    </StyledContainer>
    </CheckClickOutside>
    )
} 

export default LanguageSwitcherStructure