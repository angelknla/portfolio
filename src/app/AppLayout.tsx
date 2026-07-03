'use client';

import { Header } from '@/components/Header/Header';
import { LanguageProvider } from '@/contexts/Language';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      <Header />
      {children}
    </LanguageProvider>
  );
};
