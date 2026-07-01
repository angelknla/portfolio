'use client';

import { LanguageProvider } from '../contexts/Language';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main/Main';

export function ClientApp() {
  return (
    <LanguageProvider>
      <Header />
      <Main />
      <Footer />
    </LanguageProvider>
  );
}
