import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg"
import { FC } from "react";
import { contactData as data } from "../../data/contactData";

interface ContactProps {
  setData: (data: any) => any;
}

export const Contact:FC<ContactProps> = ({setData}) => {

  const contactData = setData(data)
  return(
    <Container id="contact">
      <header>
        <h2>{contactData.title}</h2>
        <p>{contactData.message}</p>
      </header>
      <div className="contacts">
        <div>
          <img src={emailIcon} alt="Email" />
          <a href="mailto:angelknela5@hotmail.co.uk">angelknela5@hotmail.co.uk</a>
        </div>
        <div>
          <img src={phoneIcon} alt="Email" />
          <a href="tel:+447580199079"> (+44) 07580199079</a>
        </div>  
      </div>
    </Container>
  )
}