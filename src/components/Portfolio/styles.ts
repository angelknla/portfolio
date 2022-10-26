import styled from "styled-components";

export const StyledTitle = styled.h2`
  text-align: center;
  font-size: 4rem;
  margin-bottom: 10rem;
`;

export const StyledProjectsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  padding: 1rem;
  overflow: hidden;
  .project {
    padding: 2rem 1.8rem;
    background-color: #2b2b2b;
    border-radius: 1.2rem;
    transition: 0.25s;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #FFF;
    &:hover {
      transform: translateY(-5px);
      background-color: #ebe534;
      #techList, #cardDescription {
        color: var(--black);
      }
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--blue);
      margin-bottom: 3.6rem;
      .project-links {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      a > img {
        width: 3rem;
      }
    }
    
    h3 {
      margin-bottom: 2rem;
    }
    p {
      letter-spacing: 0.12rem;
      margin-bottom: 2rem;
      a {
        color: #FFFF;
        border-bottom: 1px solid var(--blue);
        transition: color 0.25s;
        &:hover {
          color: var(--blue);
        }
      }
    }
    footer {
      margin-top: auto;
      .tech-list {
        display: flex;
        align-items: center;
        gap: 2rem;
        font-size: 1.4rem;
        opacity: 0.6;
      }
    }
  }
`;

export const StyledContainer = styled.section`
  margin-top: 10rem;

  @media (max-width: 960px){
    ${StyledProjectsWrapper} {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 740px){
    ${StyledProjectsWrapper} {
      grid-template-columns: 1fr;
    }
  }
`;