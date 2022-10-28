import styled from "styled-components";

export const Container = styled.section`
  padding-top: 13%;
  display: flex;
  justify-content: space-between;
  gap: 8rem;
  background: rgba(0,0,0,0);
  .hero-text {
    p {
      color: var(--black);
    }
    & > p{
      font-size: 1.8rem;
    }
    h1{
      font-size: 7rem;
      color: var(--black);
    }

    h3 {
      color: #016fb9;
      margin: 1rem 0;
    }

    .japanese {
      text-align: end;
      width: 44rem;
      color: var(--black);
    }
    
    p.small-resume {
      margin-bottom: 5rem;
      color: var(--black);
    }
  }

  .button {
    margin-top: 5rem;
    padding: 1.4rem 6rem;
    color: #fff;
  }

  .hero-image {
    img {
      max-width: 500px;
    }
  }


  @media(max-width: 960px){
    display: block;
    margin-top: 15%;
    .hero-text{

      h1{
        font-size: 5rem;
      }
    }
    .japanese {
      width: 31rem !important;
    }
    
    .hero-image{
      display: none;
    }

    
  }

  @media(max-width: 600px){
    margin-top: 25%;
  }
  @media(max-width: 480px){
    margin-top: 35%;
  }
`