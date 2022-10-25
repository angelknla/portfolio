import { Container } from "./styles";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { FC } from "react";

interface PortfolioProps {
  data: Array<ProjectCardProps>
}

export const Portfolio: FC<PortfolioProps> = ({data}) => {
  return(
    <Container id="portfolio">
      <h2>My Portfolio</h2>
      <div className="projects">
      {data.map((card) => 
      <ProjectCard 
        title={card.title} 
        description={card.description} 
        techStack={card.techStack} 
        iconSvg={card?.iconSvg}
        iconAlt={card?.iconAlt}
       /> 
      )}
      </div>
    </Container>
  );
}