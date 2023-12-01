import styled from "styled-components";

export const StyledInput = styled.input`
  width: 60rem;
  padding: 1rem 2rem;
  border-radius: 0.6rem;
  outline: none;
  border: none;
  background: none;
  border: 1px solid var(--black);
  color: var(--black);
  font-weight: 600;
  &::placeholder {
    color: grey;
  }
  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const StyledArea = styled.textarea`
  width: 60rem;
  padding: 1rem 2rem;
  border-radius: 0.6rem;
  outline: none;
  border: none;
  background: none;
  border: 1px solid var(--black);
  color: var(--black);
  font-weight: 600;
  &::placeholder {
    color: grey;
  }
  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  margin-top: 5rem;
  display: grid;
  place-items: center;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--black);
  }

    ${StyledArea} {
      height: 20rem;
      overflow-y: auto;
      resize: none;
    }
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem 6rem;
  text-transform: uppercase;
  a {
    background-color: transparent;
    color: #fff;
  }
`;

export const ContainerSuccess = styled.div`
  margin-top: 4rem;
  text-align: center;

  h3 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--black);
  }
`;

export const SuccessButton = styled.button`
  border-radius: 0.6rem;
  padding: 1rem;
  margin-top: 0.8rem;
  text-transform: uppercase;
  text-align: center;
  color: #fbfbfb;
`;
