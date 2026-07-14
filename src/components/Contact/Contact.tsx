import { Form } from '@/components/Form/Form';
import { useLanguage } from '@/contexts/Language';
import { contactData } from '@/data/contactData';

import styles from './Contact.module.css';

export const Contact = () => {
  const { translations } = useLanguage(contactData);
  if (!translations) return null;
  const { title, message } = translations;

  return (
    <section className={styles.container} id='contact'>
      <header className={styles.header}>
        <h2>{title}</h2>
        <p>{message}</p>
      </header>
      <Form />
      <div className={styles.contacts}>
        <a className='contactButton' href='mailto:angelknela5@hotmail.co.uk'>
          <img
            src='/assets/email-icon.webp'
            alt='Email'
            width={22}
            height={22}
          />
          angelknela5@hotmail.co.uk
        </a>
        <a className='contactButton' href='tel:+447580199079'>
          <img
            src='/assets/phone-icon.webp'
            alt='Phone'
            width={22}
            height={22}
          />
          (+44) 07580199079
        </a>
      </div>
    </section>
  );
};
