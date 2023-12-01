import {
  Container,
  ContainerSuccess,
  StyledArea,
  StyledForm,
  StyledInput,
  SubmitButton,
  SuccessButton,
} from "./styles";
import { formData as data } from "../../data/formData";
import { useForm, ValidationError } from "@formspree/react";
import { toast, ToastContainer } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import validator from "validator";

interface FormProps {
  setData: (data: any) => any;
}

export const Form = ({setData}: FormProps) => {
  const formData = setData(data);
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
      toast.success(`${formData.toastSuccess}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: "succeeded",
      });
    }
  }, [formData.toastSuccess, state]);

  const disabled = state.submitting || !validEmail || !message || !isHuman;

  if (state.succeeded) {
    return (
      <ContainerSuccess>
        <h3>{formData.success}</h3>
        <SuccessButton
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {formData.back}
        </SuccessButton>
        <ToastContainer />
      </ContainerSuccess>
    );
  }

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          placeholder={formData.emailPlaceholder}
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
          placeholder={formData.typePlaceholder}
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
          sitekey="6LcAu-IdAAAAAJOTI5E_eRltZNQCvukIl2-f1glQ"
          onChange={(e) => {
            setIsHuman(true);
          }}
        ></ReCAPTCHA>

        <SubmitButton
          type="submit"
          disabled={disabled}
        >
          {formData.send}
        </SubmitButton>
      </StyledForm>
      <ToastContainer />
    </Container>
  );
};
