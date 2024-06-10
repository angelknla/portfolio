import { createContext, ReactNode, useContext, useState } from "react";
import {
  AvailableLanguages,
  languageData,
  LanguageData,
} from "../data/dropdownData";

type LanguageContextShape = {
  language: LanguageData;
  setLanguage: (lang: LanguageData) => void;
};

const LanguageContext = createContext<LanguageContextShape>({
  language: languageData[0],
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageData>(languageData[0]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (
  data?: Record<AvailableLanguages, Record<string, any>>
) => {
  const context = useContext(LanguageContext);

  const {
    language: { language },
  } = context;

  const translations = data ? data[language] : {};

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return { ...context, translations };
};

export { LanguageProvider, useLanguage };
