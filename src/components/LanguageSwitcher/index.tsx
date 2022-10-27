import { Dispatch, FC, SetStateAction, useState } from "react";
import LanguageSwitcherStructure from "./LanguageSwitcherStructure";
import { flagsData } from "../../data/dropdownData";

interface LanguageSwitcherProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({language, setLanguage}) => {

  const [flag, setFlag] = useState(flagsData[0]);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClickSwicther = () => {
    setToggleDropdown(!toggleDropdown);
  }

  const handleClick = () => {
    setFlag(language === 'eng' ? flagsData[1] : flagsData[0])
    setLanguage(language === 'eng' ? 'esp' : 'eng')
    setToggleDropdown(!toggleDropdown);
  }


  const props = {
    flag,
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