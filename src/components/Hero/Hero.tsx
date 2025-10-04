import { BrowserRouter } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import Illustration from "../../assets/illustration.svg";
import { useLanguage } from "../../contexts/Language";
import { heroData } from "../../data/heroData";
import styles from "./Hero.module.css";

export const Hero = () => {
	const { language, translations } = useLanguage(heroData);

	if (!translations) return null;

	const { greeting, name, job, intro, contact } = translations;

	return (
		<section className={styles.container} id="home">
			<div className={styles.heroText}>
				<div className={styles.fadeInLeft}>
					<p>{greeting}</p>
				</div>
				<div className={`${styles.fadeInUp} ${styles.delay200}`}>
					<h1>{name}</h1>
				</div>
				{language.language === "japanese" && (
					<div className={styles.fadeInLeft}>
						<p className={styles.japanese}>です</p>
					</div>
				)}
				<div className={`${styles.fadeInUp} ${styles.delay300}`}>
					<h3>{job}</h3>
				</div>
				<div className={`${styles.fadeInUp} ${styles.delay400}`}>
					<p className={styles.smallResume}>{intro}</p>
				</div>

				<div className={`${styles.fadeInUp} ${styles.delay500}`}>
					<BrowserRouter>
						<NavHashLink smooth to="#contact" className={styles.button}>
							{contact}
						</NavHashLink>
					</BrowserRouter>
				</div>
			</div>
			<div className={styles.heroImage}>
				<div className={`${styles.fadeInRight} ${styles.delay200}`}>
					<img src={Illustration} alt="Ilustration" />
				</div>
			</div>
		</section>
	);
};
