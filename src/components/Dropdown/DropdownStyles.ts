import styled from "styled-components";

export const StyledButton = styled.a`
  position: relative;
  cursor: pointer;
  :hover, :focus {
    background-color: grey;
  }
  img {
    width: 3rem;
    border-radius: 50%;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  height: 4.6rem;
`;

export const DropdownContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 16px 0px rgba(0,0,0,0.2);

  @media only screen and (max-width: 800px) {
    display: inline-block;
  }
`;
