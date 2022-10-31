import styled from "styled-components";


export const Container = styled.main`
  position: relative;
  z-index: -1;
  padding: 0 17rem;
  overflow-x: hidden;
  #tsparticles{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -5;
  }

  @media (max-width: 960px){
    padding: 0 2rem;
  }

  @media(max-width: 360px){
    padding: 0 2rem;
  }
`