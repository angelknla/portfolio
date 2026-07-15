import type { AvailableLanguages } from './dropdownData';

export const heroData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    greeting: "Hi, I'm",
    name: 'Angel Canela',
    job: 'Software Engineer',
    intro:
      'Leading engineering initiatives at The LEGO Group — architecting high-scale React, Next.js & TypeScript products on serverless AWS.',
    contact: 'Get in touch',
    cv: 'Download CV',
  },
  spanish: {
    greeting: 'Hola, soy',
    name: 'Angel Canela',
    job: 'Ingeniero de Software',
    intro:
      'Liderando iniciativas de ingeniería en The LEGO Group — diseñando productos de gran escala en React, Next.js y TypeScript sobre AWS serverless.',
    contact: 'Contáctame',
    cv: 'Descargar CV',
  },
  japanese: {
    greeting: 'こんにちは、私は',
    name: 'Angel Canela',
    job: 'ソフトウェアエンジニア',
    intro:
      'The LEGO Groupでエンジニアリングをリード — サーバーレスAWS上でReact、Next.js、TypeScriptによる大規模プロダクトを設計・構築。',
    contact: '連絡する',
    cv: 'CVをダウンロード',
  },
};
