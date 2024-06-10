import {
  DropdownContainer,
  DropdownContent,
  StyledButton,
} from "./DropdownStyles";
import { languageData, LanguageData } from "../../data/dropdownData";
import { useLanguage } from "../../contexts/Language";
import { useEffect, useState } from "react";

interface DropdownProps {
  handleClickSwitcher: (value?: boolean) => void;
}

export const Dropdown = ({ handleClickSwitcher }: DropdownProps) => {
  const { setLanguage, language } = useLanguage();
  const [finalFlags, setFinalFlags] = useState(languageData);

  const updateFlagsData = (arr: Array<LanguageData>, a: number, b: number) => {
    [arr[a], arr[b]] = [arr[b], arr[a]];
    setFinalFlags([...arr]);
  };

  useEffect(() => {
    const newIndex = languageData.findIndex(
      (item) => item.language === language.language
    );
    updateFlagsData(finalFlags, 0, newIndex);
  }, [finalFlags, language]);

  const handleClick = (data: LanguageData) => {
    setLanguage(data);
    handleClickSwitcher();
  };

  return (
    <DropdownContainer draggable={true} onDrag={() => handleClickSwitcher()}>
      <DropdownContent onMouseLeave={() => handleClickSwitcher()}>
        {finalFlags.map((flag, i) => (
          <StyledButton
            id="flagButton"
            key={i}
            onClick={() => handleClick(flag)}
          >
            <img src={flag.flag} alt="language" />
          </StyledButton>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};
