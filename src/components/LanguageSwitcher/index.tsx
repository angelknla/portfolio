import { Dispatch, FC, SetStateAction, useState } from "react";
import LanguageSwitcherStructure from "./LanguageSwitcherStructure";
import { FlagsData, flagsData } from "../../data/dropdownData";

interface LanguageSwitcherProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({language, setLanguage}) => {

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClickSwicther = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleClick = (flagsData: FlagsData ) => {
    setLanguage(flagsData.flag)
    setToggleDropdown(!toggleDropdown);
  };

  const props = {
    flag: language,
    handleClick,
    toggleDropdown,
    flagsData,
    handleClickSwicther,
  }
  return (
    <LanguageSwitcherStructure {...props} />
  ) 
}

export default LanguageSwitcher;