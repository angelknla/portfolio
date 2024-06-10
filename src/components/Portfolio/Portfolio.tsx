import { StyledContainer, StyledProjectsWrapper, StyledTitle } from "./styles";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { data as portfolioData } from "../../data/portfolioData";
import { useLanguage } from "../../contexts/Language";

export const Portfolio = () => {
  const { translations } = useLanguage(portfolioData);

  return (
    <StyledContainer id="portfolio">
      <StyledTitle>{translations?.title}</StyledTitle>
      <StyledProjectsWrapper className="projects">
        {translations?.cards?.map((cardInfo: ProjectCardProps, i: number) => (
          <ProjectCard key={i} {...cardInfo} />
        ))}
      </StyledProjectsWrapper>
    </StyledContainer>
  );
};
