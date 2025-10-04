import githubIcon from "../../assets/github.png";
import instagramIcon from "../../assets/instagram.png";
import linkedinIcon from "../../assets/linkedin.png";
import { useLanguage } from "../../contexts/Language";
import { footerData } from "../../data/footerData";
import styles from "./Footer.module.css";

export const Footer = () => {
	const { translations } = useLanguage(footerData);

	if (!translations) return null;

	const { message } = translations;

	return (
		<footer className={styles.container}>
			<a href="/" className={styles.logo}>
				<span>Angel</span>
				<span> Canela</span>
			</a>
			<div>
				<p>{message}</p>
			</div>

			<div className={styles.socialMedia}>
				<a
					href="https://www.linkedin.com/in/angel-canela/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={linkedinIcon} alt="Linkedin" />
				</a>

				<a href="https://github.com/angelknla" target="_blank" rel="noreferrer">
					<img src={githubIcon} alt="GitHub" />
				</a>

				<a href="b" target="_blank" rel="noreferrer">
					<img src={instagramIcon} alt="Instagram" />
				</a>
			</div>
		</footer>
	);
};
