import { Dispatch, FC, SetStateAction, useState } from "react";
import ukFlag from '../../assets/UK.png'
import spainFlag from '../../assets/Spain.png'
import LanguageSwitcherStructure from "./LanguageSwitcherStructure";

interface LanguageSwitcherProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({language, setLanguage}) => {

  const [flag, setFlag] = useState(language === 'eng' ? ukFlag : spainFlag);

  const handleClick = () => {
    setFlag(flag === ukFlag ? spainFlag : ukFlag)
    setLanguage(language === 'eng' ? 'esp' : 'eng')
  }

  const props = {
    flag,
    handleClick,
  }
  return (
    <LanguageSwitcherStructure {...props} />
  ) 
}

export default LanguageSwitcher;