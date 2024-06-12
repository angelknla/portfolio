import styled from "styled-components";

export const Container = styled.section`
  padding-top: 10%;
  display: flex;
  gap: 8rem;
  background: rgba(0, 0, 0, 0);

  .hero-text {
    flex: 1;
    p {
      color: var(--black);
    }
    & > p {
      font-size: 1.8rem;
    }
    h1 {
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
    display: flex;
    justify-content: flex-end;
    flex: 1;
    img {
      max-width: 450px;
    }
  }

  @media (max-width: 960px) {
    display: block;
    margin-top: 15%;

    .hero-text {
      h1 {
        font-size: 5rem;
      }
    }

    .japanese {
      width: 31rem !important;
    }

    .hero-image {
      display: none;
    }
  }

  @media (max-width: 600px) {
    margin-top: 20%;
  }
  @media (max-width: 480px) {
    margin-top: 30%;

    .hero-text {
      p.small-resume {
        margin-bottom: 4rem;
      }
    }
    .button {
      padding: 1.2rem 4rem;
    }
  }
`;
