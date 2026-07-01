import type { AvailableLanguages } from './dropdownData';

const ReactIcon = (message: string) => (
  <span>
    {message} <img src='/assets/react-icon.svg' alt='React' />
  </span>
);

const ReactIconJapanese = () => (
  <span>
    このサイトは <img src='/assets/react-icon.svg' alt='React' />{' '}
    を使用して作成されました
  </span>
);

export const footerData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    message: ReactIcon('This site was created using'),
  },
  spanish: {
    message: ReactIcon('Este sitio ha sido creado con'),
  },
  japanese: {
    message: ReactIconJapanese(),
  },
};
