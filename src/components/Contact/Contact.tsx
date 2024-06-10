import { Contacts, Container, Header } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { contactData } from "../../data/contactData";
import { Form } from "../Form/Form";
import { useLanguage } from "../../contexts/Language";

export const Contact = () => {
  const { translations } = useLanguage(contactData);
  if (!translations) return null;
  const { title, message } = translations;

  return (
    <Container id="contact">
      <Header>
        <h2>{title}</h2>
        <p>{message}</p>
      </Header>
      <Form />
      <Contacts>
        <div>
          <img src={emailIcon} alt="Email" />
          <a href="mailto:angelknela5@hotmail.co.uk">
            angelknela5@hotmail.co.uk
          </a>
        </div>
        <div>
          <img src={phoneIcon} alt="Email" />
          <a href="tel:+447580199079"> (+44) 07580199079</a>
        </div>
      </Contacts>
    </Container>
  );
};
