import styled from "styled-components";

export const Container = styled.section`
  margin-top: 12rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .about-text {
    font-weight: 200;
    color: var(--black)
  }

  .hard-skills {
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.8rem;
  }
  .hability {
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
      width: 3.4rem;
    }
  }

  h2 {
    display: inline-block;
    margin-bottom: 2rem;
    border-bottom: 0.2rem solid var(--blue);
  }

  h3 {
    margin-top: 2rem;
    color: var(--blue);
  }

  p {
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
    font-weight: 500;
  }
  
  

  .about-image {
    text-align: center;
    place-self: center;
    margin-left: 12rem;

    img {
      max-width: 80%;
      height: 80%;
      border-radius: 5%;
      filter: grayscale(0);
      transition: filter 0.5s;
      &:hover{
        filter: grayscale(1);
     }
   }
  }

  @media only screen and (max-width: 480px) {
    margin-top: 9rem;
    .about-image {
      max-width: 100%;
      margin-top: 4rem;
      margin-left: 0rem;

      img {
        max-width: 100%;
        width: 95%;
        height: 95%;
      }
    }
  }

  @media (max-width: 960px){
    display: block;
    text-align: center;
    
    .about-image{
      display: flex;
    }
    .hard-skills{
      justify-content: center;
    }
  }
`