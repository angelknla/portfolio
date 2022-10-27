import { Container, StyledLinkedIn } from './styles'
import { BrowserRouter as Router } from 'react-router-dom'
import linkedinIcon from '../../assets/linkedin.png'
import { NavHashLink, HashLink } from 'react-router-hash-link'
import { Dispatch, FC, SetStateAction, useState } from 'react'

import CV from '../../assets/Angel_CV_2022New.pdf'
import LanguageSwitcher from '../LanguageSwitcher'
import { headerData } from '../../data/headerData'

export const toggleTheme = () => {
    let html = document.getElementsByTagName('html')[0]
    html.classList.toggle('light')
  }

interface HeaderProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export const Header: FC<HeaderProps>  = ({language, setLanguage}) => {
  const [active, setActive] = useState(false)

  var header;
  switch(language) {
   case 'english':
     header = headerData.english;
     break;
   case 'spanish':
     header = headerData.spanish;
     break;
   case 'japanese':
     header = headerData.japanese;
     break;
   default:
     header = headerData.english;
}
  function closeMenu() {
    setActive(false)
  }

  const props = {
    language,
    setLanguage,
  }

  return (
    <>
    <Container className="header-fixed">
     
      <Router>
        <HashLink id="headerName" smooth to="#home" className="logo">
          <span>Angel</span>
          <span> Canela</span>
        </HashLink>

        <input
          onChange={toggleTheme}
          className="container_toggle"
          type="checkbox"
          id="switch"
          name="mode" />
        <label htmlFor="switch">Toggle</label>

        <nav className={active ? 'active' : ''}>
          <NavHashLink smooth to="#home" onClick={closeMenu}>
            {header.home}
          </NavHashLink>
          <NavHashLink smooth to="#about" onClick={closeMenu}>
            {header.about}
          </NavHashLink>
          <NavHashLink smooth to="#portfolio" onClick={closeMenu}>
            {header.portfolio}
          </NavHashLink>
          <NavHashLink smooth to="#contact" onClick={closeMenu}>
            {header.contact}
          </NavHashLink>
          <a href={CV} download className="button">
            CV
          </a>
          <StyledLinkedIn
            href="https://www.linkedin.com/in/angel-canela/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedinIcon} alt="Linkedin" />
          </StyledLinkedIn>
          <LanguageSwitcher {...props}/>
        </nav>

        <div
          aria-expanded={active ? 'true' : 'false'}
          aria-haspopup="true"
          aria-label={active ? 'Close menu' : 'Open Menu'}
          className={active ? 'menu active' : 'menu'}
          onClick={() => {
            setActive(!active)
          } }
        ></div>
      </Router>
    </Container></>
  )
}
