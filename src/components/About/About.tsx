import image from "../../assets/angelnew.jpg";
import bootstrapIcon from "../../assets/bootstrap-icon.svg";
import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nextIcon from "../../assets/nextjs-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import reduxIcon from "../../assets/redux.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import { useLanguage } from "../../contexts/Language";
import { aboutData } from "../../data/aboutData";
import styles from "./About.module.css";

export const About = () => {
	const { translations } = useLanguage(aboutData);
	if (!translations) return null;
	const { title, p1, p2, p3, p4, p5, h3 } = translations;

	return (
		<section className={styles.container} id="about">
			<div className={styles.aboutText}>
				<div
					className={`${styles.fadeInLeft} ${styles.delay300}`}
					style={{
						marginTop: "2rem",
						marginBottom: "2rem",
					}}
				>
					<h2>{title}</h2>
					<p>{p1}</p>
					<br></br>
					<p>{p2}</p>
					<br></br>
					<p>{p3}</p>
					<br></br>
					<p>
						{p4.title}
						<br></br>
						{p4.content}
					</p>
					<br></br>
					<p>{p5}</p>
					<h3>{h3}</h3>
				</div>
				<div className={styles.hardSkills}>
					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay100}`}>
							<img src={reactIcon} alt="React" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay200}`}>
							<img src={reduxIcon} alt="Redux" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay300}`}>
							<img src={bootstrapIcon} alt="Vue" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay400}`}>
							<img src={jsIcon} alt="JavaScript" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay500}`}>
							<img src={typescriptIcon} alt="Typescript" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay600}`}>
							<img src={htmlIcon} alt="Html" />
						</div>
					</div>

					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay700}`}>
							<img src={cssIcon} alt="Css" />
						</div>
					</div>
					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay800}`}>
							<img src={nodeIcon} alt="Node" />
						</div>
					</div>
					<div className={styles.hability}>
						<div className={`${styles.fadeInUp} ${styles.delay900}`}>
							<img src={nextIcon} alt="Node" />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.aboutImage}>
				<div className={`${styles.fadeInRight} ${styles.delay500}`}>
					<img src={image} height="600px" alt="Profile pic" />
				</div>
			</div>
		</section>
	);
};
