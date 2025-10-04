import { useId, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";
import CV from "../../assets/Angel_CV_2022New.pdf";
import linkedinIcon from "../../assets/linkedin.png";
import { useLanguage } from "../../contexts/Language";
import { headerData } from "../../data/headerData";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import styles from "./Header.module.css";

export const toggleTheme = () => {
	const html = document.getElementsByTagName("html")[0];
	html.classList.toggle("dark");
};

export const Header = () => {
	const { translations } = useLanguage(headerData);
	const [active, setActive] = useState(false);
	const [open, setOpen] = useState(false);
	const switchId = useId();

	if (!translations) return null;

	const { home, about, portfolio, contact } = translations;

	function closeMenu() {
		setActive(false);
	}

	const handleClick = () => {
		setActive(!active);
		setOpen(true);
	};

	return (
		<header className={`${styles.container} header-fixed`}>
			<Router>
				<HashLink id="headerName" smooth to="#home" className={styles.logo}>
					<span>Angel</span>
					<span> Canela</span>
				</HashLink>
				<input
					onChange={toggleTheme}
					className="container_toggle"
					type="checkbox"
					id={switchId}
					name="mode"
				/>
				<label htmlFor={switchId}>Toggle</label>
				<nav
					className={`${styles.nav} ${active ? styles.active : open ? styles.inactive : ""}`}
				>
					<NavHashLink smooth to="#home" onClick={closeMenu}>
						{home}
					</NavHashLink>
					<NavHashLink smooth to="#about" onClick={closeMenu}>
						{about}
					</NavHashLink>
					<NavHashLink smooth to="#portfolio" onClick={closeMenu}>
						{portfolio}
					</NavHashLink>
					<NavHashLink smooth to="#contact" onClick={closeMenu}>
						{contact}
					</NavHashLink>
					<a href={CV} download className={styles.button}>
						CV
					</a>
					<a
						href="https://www.linkedin.com/in/angel-canela/"
						target="_blank"
						rel="noreferrer"
						className={styles.styledLinkedIn}
					>
						<img src={linkedinIcon} alt="Linkedin" />
					</a>
					<LanguageSwitcher />
				</nav>
				<button
					type="button"
					aria-expanded={active}
					aria-controls="main-navigation"
					aria-label={active ? "Close menu" : "Open Menu"}
					className={`${styles.menu} ${active ? styles.active : ""}`}
					onClick={handleClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleClick();
						}
					}}
				></button>
			</Router>
		</header>
	);
};
