import { CheckClickOutside } from "../../utils/ClickOutside";
import { Dropdown } from "../Dropdown/Dropdown";
import { StyledButton, StyledContainer } from "./LanguageSwitcherStyles";

import { useLanguage } from "../../contexts/Language";
import { useState } from "react";

export const LanguageSwitcher = () => {
  const { language } = useLanguage();
  var isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClickSwitcher = () => {
    setToggleDropdown((prev) => !prev);
  };

  return (
    <StyledContainer>
      {!toggleDropdown && (
        <StyledButton
          onMouseEnter={() => !isMobile && handleClickSwitcher()}
          onClick={() => handleClickSwitcher()}
        >
          <img src={language.flag} alt="language" />
        </StyledButton>
      )}
      {toggleDropdown && (
        <CheckClickOutside onClickOutside={() => handleClickSwitcher()}>
          <Dropdown handleClickSwitcher={handleClickSwitcher} />
        </CheckClickOutside>
      )}
    </StyledContainer>
  );
};
