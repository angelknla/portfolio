'use client';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Main } from '@/components/Main/Main';
import { LanguageProvider } from '@/contexts/Language';

export const HomePage = () => {
  return (
    <LanguageProvider>
      <Header />
      <Main />
      <Footer />
    </LanguageProvider>
  );
};
