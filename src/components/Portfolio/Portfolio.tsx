import { StyledContainer, StyledProjectsWrapper, StyledTitle } from "./styles";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { FC } from "react";

interface PortfolioProps {
  data: Array<ProjectCardProps>
}

export const Portfolio: FC<PortfolioProps> = ({data}) => {
  return(
    <StyledContainer id="portfolio">
      <StyledTitle>My Portfolio</StyledTitle>
      <StyledProjectsWrapper className="projects">
      {data.map((cardInfo) => 
      <ProjectCard {...cardInfo}/> 
      )}
      </StyledProjectsWrapper>
    </StyledContainer>
  );
}