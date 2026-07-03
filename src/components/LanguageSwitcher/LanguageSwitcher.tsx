import { useState } from 'react';

import { Dropdown } from '@/components/Dropdown/Dropdown';
import { useLanguage } from '@/contexts/Language';
import { CheckClickOutside } from '@/utils/ClickOutside';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
  const { language } = useLanguage();
  const isMobile =
    typeof navigator !== 'undefined' &&
    navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClickSwitcher = () => {
    setToggleDropdown((prev) => !prev);
  };

  return (
    <div
      className={styles.container}
      onMouseLeave={() => !isMobile && setToggleDropdown(false)}
    >
      {!toggleDropdown && (
        <button
          type='button'
          className={styles.button}
          onMouseEnter={() => !isMobile && handleClickSwitcher()}
          onClick={() => handleClickSwitcher()}
        >
          <img src={language.flag} alt='language' width={30} height={30} />
        </button>
      )}
      {toggleDropdown && (
        <CheckClickOutside onClickOutside={() => handleClickSwitcher()}>
          <Dropdown handleClickSwitcher={handleClickSwitcher} />
        </CheckClickOutside>
      )}
    </div>
  );
};
