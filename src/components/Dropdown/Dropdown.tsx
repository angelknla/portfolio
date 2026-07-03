import { useMemo } from 'react';

import Image from 'next/image';

import { useLanguage } from '@/contexts/Language';
import type { LanguageData } from '@/data/dropdownData';
import { languageData } from '@/data/dropdownData';

import styles from './Dropdown.module.css';

interface DropdownProps {
  handleClickSwitcher: (value?: boolean) => void;
}

export const Dropdown = ({ handleClickSwitcher }: DropdownProps) => {
  const { setLanguage, language } = useLanguage();

  const sortedFlags = useMemo(() => {
    const idx = languageData.findIndex(
      (item) => item.language === language.language
    );
    if (idx <= 0) return languageData;
    const result = [...languageData];
    [result[0], result[idx]] = [result[idx], result[0]];
    return result;
  }, [language.language]);

  const handleClick = (data: LanguageData) => {
    setLanguage(data);
    handleClickSwitcher();
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownContent}>
        {sortedFlags.map((flag, i) => (
          <button
            className={`${styles.styledButton} dropdown-button`}
            key={`flag-${flag.language}-${i}`}
            onClick={() => handleClick(flag)}
            type='button'
          >
            <Image src={flag.flag} alt={flag.language} width={28} height={20} />
          </button>
        ))}
      </div>
    </div>
  );
};
