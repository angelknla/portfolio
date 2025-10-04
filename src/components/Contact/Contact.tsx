import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import { useLanguage } from "../../contexts/Language";
import { contactData } from "../../data/contactData";
import { Form } from "../Form/Form";
import styles from "./Contact.module.css";

export const Contact = () => {
	const { translations } = useLanguage(contactData);
	if (!translations) return null;
	const { title, message } = translations;

	return (
		<section className={styles.container} id="contact">
			<header className={styles.header}>
				<h2>{title}</h2>
				<p>{message}</p>
			</header>
			<Form />
			<div className={styles.contacts}>
				<div className="contactButton">
					<img src={emailIcon} alt="Email" />
					<a href="mailto:angelknela5@hotmail.co.uk">
						angelknela5@hotmail.co.uk
					</a>
				</div>
				<div className="contactButton">
					<img src={phoneIcon} alt="Email" />
					<a href="tel:+447580199079"> (+44) 07580199079</a>
				</div>
			</div>
		</section>
	);
};
