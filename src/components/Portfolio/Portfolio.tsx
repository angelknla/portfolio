import { useLanguage } from "../../contexts/Language";
import { data as portfolioData } from "../../data/portfolioData";
import styles from "./Portfolio.module.css";
import type { ProjectCardProps } from "./ProjectCard";
import ProjectCard from "./ProjectCard";

export const Portfolio = () => {
	const { translations } = useLanguage(portfolioData);

	return (
		<section className={styles.container} id="portfolio">
			<h2 className={styles.title}>{translations?.title}</h2>
			<div className={`${styles.projectsWrapper} projects`}>
				{translations?.cards?.map((cardInfo: ProjectCardProps) => (
					<ProjectCard key={cardInfo.title} {...cardInfo} />
				))}
			</div>
		</section>
	);
};
