import { AvailableLanguages } from "./dropdownData";

export const headerData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    home: 'Home',
    about: "About me",
    portfolio: 'Portfolio',
    contact: "Contact",
  },
  spanish: {
    home: 'Inicio',
    about: "Sobre mi",
    portfolio: 'Porfolio',
    contact: "Contacto"
  },
  japanese: {
    home: 'ホームページ',
    about: "私について",
    portfolio: 'ポートフォリオ',
    contact: "連絡"
  }
};