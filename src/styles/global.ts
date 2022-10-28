import { createGlobalStyle } from "styled-components";



export const GlobalStyle = createGlobalStyle`

  :root{
    --pink: #E31F71;
    --black: #212121;
    --green: #23ce6b;
    --blue: #016fb9;
    scroll-padding-top: 10rem;

    &.light{

      body{
        transition: 0.5s;
        background-color: var(--black);
        color: #fff;
      }
      .logo{
        color: #fff;
        &::first-letter {
          color: #ebe534;
        }
      }
      .about-text {
        color: #fff;
        h2 {
          border-bottom: 0.2rem solid #ebe534;
        }
        h3 {
          color: #ebe534
        }
      }
      .contacts {
        div {
          background-color: #ebe534;
          a {
            color: var(--black);
          }
          &:hover{
            background-color: #016fb9;
            a {
              color: var(--black);
            }
          }
        }
      }
      #contact {
        h2 {
          color: #fff;
        }
        p {
          color: #ebe534;
        }
      }
      .hero-text {
        p, h1{
          color: #fff;
        }
        .button {
          color: var(--black);
        }
        h3 {
          color: #ebe534;
        }
      }
      button, .button {
        background-color: #ebe534;
      }
      #portfolio {
        h2 {
          color: #fff;
        }
      }

      header.header-fixed{
        transition: 0.5s;
        background-color: rgba(33, 33, 33, 0.314);
        a.button {
          color: var(--black);
        }
        label {
          background: #ebe534;
        }
        a {
          transition: 0.5s;
          color: #fff;
        }
        .menu,.menu:before, .menu:after{
          background-color: #f5f5f5; 
        }
        .menu.active{
          background-color: rgba(555,555,555,0);
        }
      }

      footer.footer{
        transition: 0.5s;
        background-color: rgba(0,0,0,0.1);
        color: #fff;
      }

      form {
        button {
          a {
            color: var(--black);
          }
        }
        input,textarea {
          transition: 0.5s;
          border: solid 1px #fff;
          color: var(--black);
          &::placeholder{
            transition: 0.5s;
            color: #fff;
          }
        }
      }

      @media (max-width: 960px){
        nav {
          background-color: var(--black);
        }
      }

    }
  }

  ul, li {
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding:0;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    background-color: #f5f5f5;
    color: #FFFF;
  }

  body, input, textarea, button{
    font-family: 'Roboto Slab', sans-serif;
    font-weight: 200;
  }

  a{
    text-decoration: none;
  }



  button, .button{
    border: none;
    cursor: pointer;
    background-color: #016fb9;
    color: #FFFF;
    border-radius: 2rem;
    font-weight: 500;
    transition: filter 0.25s;
    &:hover{
      filter: brightness(0.8);
    }
  }

  button:disabled, .button:disabled{
    filter: brightness(1.0);
    cursor: not-allowed;
  }

  .logo{
    font-size: 3rem;
    color: #FFFF;
    &::first-letter{
      color: #016fb9;
    }
  }
  

`