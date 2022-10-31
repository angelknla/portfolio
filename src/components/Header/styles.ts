import styled from "styled-components";

interface props {
  active: boolean
}

export const Container = styled.header<props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 17rem;
  background-color: rgba(245, 245, 245, 0.314);
  backdrop-filter: blur(6px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;

  .logo {
      color: var(--black);
    }

  nav {
    display: flex;
    align-items: center;
    gap: 1.8rem;
    a.button {
      color: var(--black);
    }
    a {
      color: var(--black);
      padding: 0.6rem;
      font-family: 'Roboto Slab', sans-serif;
      font-weight: 300;
      text-transform: uppercase;
      transition: filter 0.25s;

      &.button{
        padding: 0.6rem 5rem;
        color: #fff;
      }

      &:hover{
        filter: brightness(0.6);
      }
    }

  }

  .menu-container{
    cursor: pointer;
    padding: 0.6rem 0;
  }

  .menu {
    width: 2rem;
    height: 0.2rem;
    background: #FFFF;
    position: relative;
    cursor: pointer;
    display: none;

    &:before{
      bottom: 0.5rem;
    }
    &:after{
      top: 0.5rem;
    }

    

    &.active:before{
      bottom: 0;
      transform: rotate(45deg);
    }

    &.active:after{
      top: 0;
      transform: rotate(135deg);
    }

    &.active{
      background-color: rgba(0, 0, 0, 0);
    }

  }

  .menu:before, .menu:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 0.2rem;
    background: #FFFF;
    cursor: pointer;
    transition: .6s;
  }


  input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
    outline: none;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 55px;
    height: 30px;
    background: var(--blue);
    display: block;
    justify-content: center;
    align-items: center;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    position: relative;
    margin-left: auto;
    right: 10px;
  }

  @media only screen and (max-width: 800px) {
    label {
      position: relative;
      margin-right: 0.5rem;
    }
  }

  label:after {
    content: '';
    background: #FFF;
    width: 20px;
    height: 20px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 4px;
    transition: cubic-bezier(0.68, -0.55, 0.27, 01.55) 320ms;
  }

  input:checked + label {
    background: #016fb9;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  @media(max-width: 360px){
    padding: 1.8rem 2rem;
  }

  @media (max-width: 960px) {
    padding: 1.8rem 2rem;

    .menu {
      display: block;
    }
    .menu,.menu:before, .menu:after {
          background-color: var(--black); 
        }
        .menu.active{
          background-color: #fff
        }

    nav {
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow: hidden;
      opacity: 0;
      font-size: 14px;
      visibility: hidden;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      width: 100vw;
      background: #ebe534;
      top: 0;
      left: 0;
      transition: opacity 0.25s;
      background-color: #fff;
      box-shadow: 1px 1px 20px 0px rgba(0,0,0,0.2);
      border-radius: 0px 0px 15px 15px;

      a.button {
        background-color: #016fb9;
      }

      @keyframes expandLeft {
      from {
        width: 10vw;
        height: 100vh
        }
      to {
        width: 40vw;
        height: 100vh;
        }
      }

       @keyframes expandRight {
      from {
        width: 40vw;
        height: 100vh
        }
      to {
        width: 0vw;
        height: 100vh;
        }
      }

      @keyframes expandDown {
      from {
        height: 10vw;
        }
      to {
        height: 80vh;
        }
      }

       @keyframes expandUp {
      from {
        height: 80vh;
        }
      to {
        height: 0vh;
        }
      }

      &.active {
        opacity: 1;
        visibility: visible;
        animation: expandDown 0.65s ease-in-out forwards;
      }

       &.inactive {
        opacity: 1;
        visibility: visible;
        animation: expandUp 0.75s ease-in-out forwards;
      }
    }
  }
`;

export const StyledLinkedIn = styled.a`
  img {
    width: 25px;
  }
`