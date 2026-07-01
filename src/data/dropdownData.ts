export type AvailableLanguages = 'english' | 'spanish' | 'japanese';

export type LanguageData = {
  language: AvailableLanguages;
  flag: string;
};

export const languageData: LanguageData[] = [
  { language: 'english', flag: '/assets/UK.png' },
  { language: 'spanish', flag: '/assets/Spain.png' },
  { language: 'japanese', flag: '/assets/japan.png' },
];
