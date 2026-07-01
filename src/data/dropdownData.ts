export type AvailableLanguages = 'english' | 'spanish' | 'japanese';

export type LanguageData = {
  language: AvailableLanguages;
  flag: string;
};

export const languageData: LanguageData[] = [
  { language: 'english', flag: '/assets/UK.webp' },
  { language: 'spanish', flag: '/assets/Spain.webp' },
  { language: 'japanese', flag: '/assets/japan.webp' },
];
