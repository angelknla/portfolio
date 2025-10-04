import githubIcon from "../../assets/github-icon.svg";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
	iconSvg?: string;
	iconAlt?: string;
	title: string;
	href: string;
	description: string;
	techStack: Array<string>;
	stroke?: string;
}

const ProjectCard = ({
	iconSvg = githubIcon,
	iconAlt = "Github",
	title,
	href,
	description,
	techStack,
	stroke = "var(--blue)",
}: ProjectCardProps) => {
	return (
		<div className={styles.project}>
			<header className={styles.header}>
				<svg
					width="50"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					viewBox="0 0 24 24"
					fill="none"
					stroke={stroke}
					strokeWidth="1"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Folder</title>
					<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
				</svg>
				<div className={styles.projectLinks}>
					<a href={href} target="_blank" rel="noreferrer">
						<img src={iconSvg} alt={iconAlt} />
					</a>
				</div>
			</header>
			<div className={styles.body}>
				<h3>{title}</h3>
				<p className={styles.cardDescription}>{description}</p>
			</div>
			<footer className={styles.footer}>
				<ul className={styles.techList}>
					{techStack?.map((tech) => (
						<li key={`${tech}`}>{tech}</li>
					))}
				</ul>
			</footer>
		</div>
	);
};

export default ProjectCard;
