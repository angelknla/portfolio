import styled from "styled-components";

export const StyledButton = styled.a`
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  :hover, :focus {
    opacity: 0.7;
    background-color: #D5E7F7;
  }
  img {
    width: 3rem;
    border-radius: 50%;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  height: 4.6rem;
  border-radius: 25px;
`;

export const DropdownContent = styled.div`
  position: relative;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 16px 0px rgba(0,0,0,0.2);
`;
