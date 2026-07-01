import type { AvailableLanguages } from './dropdownData';

export const heroData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    greeting: "Hi, I'm",
    name: 'Angel Canela',
    job: 'Full Stack Software Engineer',
    intro:
      'Building scalable web products at The LEGO Group — specializing in React, Next.js & TypeScript.',
    contact: 'Get in touch',
  },
  spanish: {
    greeting: 'Hola, soy',
    name: 'Angel Canela',
    job: 'Ingeniero de Software Full Stack',
    intro:
      'Construyendo productos web escalables en The LEGO Group — especializado en React, Next.js y TypeScript.',
    contact: 'Contáctame',
  },
  japanese: {
    greeting: 'こんにちは、私は',
    name: 'Angel Canela',
    job: 'フルスタックソフトウェアエンジニア',
    intro:
      'The LEGO Groupでスケーラブルなウェブ製品を構築 — React、Next.js、TypeScriptを専門とする。',
    contact: '連絡する',
  },
};
