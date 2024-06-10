import {
  Container,
  ContainerSuccess,
  StyledArea,
  StyledForm,
  StyledInput,
  SubmitButton,
  SuccessButton,
} from "./styles";
import { formData } from "../../data/formData";
import { useForm, ValidationError } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import validator from "validator";
import { useLanguage } from "../../contexts/Language";

export const Form = () => {
  const { translations } = useLanguage(formData);
  const [state, handleSubmit] = useForm("mgejjdoq");
  const [isHuman, setIsHuman] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [message, setMessage] = useState("");

  const verifyEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  useEffect(() => {
    if (state.succeeded) {
      toast.success(`${translations?.toastSuccess}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: "succeeded",
      });
    }
  }, [translations?.toastSuccess, state]);

  const disabled = state.submitting || !validEmail || !message || !isHuman;

  if (state.succeeded) {
    return (
      <ContainerSuccess>
        <h3>{translations?.success}</h3>
        <SuccessButton
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {translations?.back}
        </SuccessButton>
        <ToastContainer />
      </ContainerSuccess>
    );
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          placeholder={translations?.emailPlaceholder}
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            verifyEmail(e.target.value);
          }}
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <StyledArea
          required
          placeholder={translations?.typePlaceholder}
          id="message"
          name="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <ReCAPTCHA
          sitekey="6Lf_2SIpAAAAAOJBFOnaBw9aaaGNJ5UbOGE9BTIu"
          onChange={(e) => {
            setIsHuman(true);
          }}
        ></ReCAPTCHA>

        <SubmitButton type="submit" disabled={disabled}>
          {translations?.send}
        </SubmitButton>
      </StyledForm>
      <ToastContainer />
    </Container>
  );
};
