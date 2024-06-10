import ukFlag from "../assets/UK.png";
import spainFlag from "../assets/Spain.png";
import japanFlag from "../assets/japan.png";

export type AvailableLanguages = "english" | "spanish" | "japanese";

export type LanguageData = {
    language: AvailableLanguages;
    flag: string;
};

export const languageData: LanguageData[] = [
    { language: "english", flag: ukFlag },
    { language: "spanish", flag: spainFlag },
    { language: "japanese", flag: japanFlag },
];
