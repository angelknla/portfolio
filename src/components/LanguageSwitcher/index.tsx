import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import LanguageSwitcherStructure from "./LanguageSwitcherStructure";
import { flagsData } from "../../data/dropdownData";

interface LanguageSwitcherProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({language, setLanguage}) => {

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [finalFlags, setFinalFlags] = useState(flagsData);
  var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

  const handleClickSwitcher = (value?: boolean) => {
    setToggleDropdown(value ?? !toggleDropdown);
  };

  const updateFlagsData = (arr: Array<string>, a: number, b: number) => {
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }

  const handleClick = (data: string, value?: boolean ) => {
    setLanguage(data)
    setToggleDropdown(value ?? !toggleDropdown);
  };

  useEffect(() => {
   const newIndex = flagsData.indexOf(language);
   updateFlagsData(flagsData, 0, newIndex)
   setFinalFlags(flagsData);
  }, [language])

  const props = {
    flag: language,
    handleClick,
    toggleDropdown,
    flagsData: finalFlags,
    handleClickSwitcher,
    isMobile,
  }
  return (
    <LanguageSwitcherStructure {...props} />
  ) 
}

export default LanguageSwitcher;