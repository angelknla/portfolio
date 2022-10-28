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

  const handleClickSwitcher = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const updateFlagsData = (arr: Array<string>, a: number, b: number) => {
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }

  const handleClick = (data: string ) => {
    setLanguage(data)
    setToggleDropdown(!toggleDropdown);
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
  }
  return (
    <LanguageSwitcherStructure {...props} />
  ) 
}

export default LanguageSwitcher;