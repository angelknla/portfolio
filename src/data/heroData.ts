import type { AvailableLanguages } from './dropdownData';

export const heroData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    greeting: "Hi, I'm",
    name: 'Angel Canela',
    job: '<software_engineer />',
    intro:
      'Building scalable web products at The LEGO Group — specializing in React, Next.js & TypeScript.',
    contact: 'Get in touch',
    cv: 'Download CV',
  },
  spanish: {
    greeting: 'Hola, soy',
    name: 'Angel Canela',
    job: '<ingeniero_de_software />',
    intro:
      'Construyendo productos web escalables en The LEGO Group — especializado en React, Next.js y TypeScript.',
    contact: 'Contáctame',
    cv: 'Descargar CV',
  },
  japanese: {
    greeting: 'こんにちは、私は',
    name: 'Angel Canela',
    job: '<ソフトウェアエンジニア />',
    intro:
      'The LEGO Groupでスケーラブルなウェブ製品を構築 — React、Next.js、TypeScriptを専門とする。',
    contact: '連絡する',
    cv: 'CVをダウンロード',
  },
};
