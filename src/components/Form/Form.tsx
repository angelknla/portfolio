import { useId, useState } from 'react';

import { useForm, ValidationError } from '@formspree/react';
import dynamic from 'next/dynamic';

import { useLanguage } from '../../contexts/Language';
import { formData } from '../../data/formData';

import styles from './Form.module.css';

const ReCAPTCHA = dynamic(
  () =>
    import('react-google-recaptcha').then((mod) => ({
      default: mod.default as any,
    })),
  { ssr: false }
) as React.ComponentType<{
  sitekey: string;
  onChange: (token: string | null) => void;
}>;

export const Form = () => {
  const { translations } = useLanguage(formData);
  const [state, handleSubmit] = useForm('mgejjdoq');
  const [isHuman, setIsHuman] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState('');
  const [formFocused, setFormFocused] = useState(false);
  const emailId = useId();
  const messageId = useId();

  const verifyEmail = (email: string) => {
    setValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const disabled = state.submitting || !validEmail || !message || !isHuman;

  if (state.succeeded) {
    return (
      <div className={styles.containerSuccess}>
        <h3>{translations?.success}</h3>
        <button
          type='button'
          className={styles.successButton}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {translations?.back}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onFocus={() => setFormFocused(true)}
      >
        <input
          className={styles.input}
          placeholder={translations?.emailPlaceholder}
          id={emailId}
          type='email'
          name='email'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            verifyEmail(e.target.value);
          }}
          required
        />
        <ValidationError prefix='Email' field='email' errors={state.errors} />
        <textarea
          className={styles.textarea}
          required
          placeholder={translations?.typePlaceholder}
          id={messageId}
          name='message'
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
          }}
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
        {formFocused && (
          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA
              sitekey='6Lf_2SIpAAAAAOJBFOnaBw9aaaGNJ5UbOGE9BTIu'
              onChange={(token: string | null) => {
                setIsHuman(!!token);
              }}
            />
          </div>
        )}

        <button
          className={styles.submitButton}
          type='submit'
          disabled={disabled}
        >
          {translations?.send}
        </button>
      </form>
    </div>
  );
};
