import styled from "styled-components";

export const StyledButton = styled.a`
  position: relative;
  cursor: pointer;
  border: none;
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
  background: white;
  height: 4.6rem;
`;

export const DropdownContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;
