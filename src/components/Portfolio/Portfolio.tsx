import { StyledContainer, StyledProjectsWrapper, StyledTitle } from "./styles";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { data } from "../../data/portfolioData";
import { FC } from "react";

interface PortfolioProps {
  setData: (data: any) => any;
}

export const Portfolio: FC<PortfolioProps> = ({setData}) => {

  const portfolioData = setData(data)
  
  return(
    <StyledContainer id="portfolio">
      <StyledTitle>{portfolioData.title}</StyledTitle>
      <StyledProjectsWrapper className="projects">
      {portfolioData.cards?.map((cardInfo: ProjectCardProps, i: number) => 
      <ProjectCard key={i} {...cardInfo}/> 
      )}
      </StyledProjectsWrapper>
    </StyledContainer>
  );
}