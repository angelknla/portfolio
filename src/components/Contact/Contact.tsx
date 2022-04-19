import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg"
import { Form } from "../Form/Form";


export function Contact(){

  return(
    <Container id="contact">
      <header>
        <h2>Get in touch</h2>
        <p>Please don't hesitate to send a message.</p>
      </header>
      <div className="contacts">
        <div>
          <img src={emailIcon} alt="Email" />
          <a href="mailto:angel.canela@kurtgeiger.com">angel.canela@kurtgeiger.com</a>
        </div>
        <div>
          <img src={phoneIcon} alt="Email" />
          <a href="tel:+447580199079"> (+44) 07580199079</a>
        </div>  
      </div>
      <Form></Form>
    </Container>
  )
}