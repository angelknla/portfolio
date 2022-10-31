import styled from "styled-components";

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



export const StyledButton = styled.a`
  @keyframes scale {
    from {
      height: 15px;
    }
    to {
      height: 45px;
    }
  }

  @keyframes scaleUp {
    from {
      height: 45px;
    }
    to {
      height: 15px;
    }
  }
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  animation-name: scale;
  animation-duration: 0.3s;

  img {
    width: 3rem;
    border-radius: 50%;
  }
`;