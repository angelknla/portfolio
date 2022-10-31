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
    html.classList.toggle('dark')
  }

export interface HeaderProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setData: (data: any) => any;
}

export const Header: FC<HeaderProps>  = ({language, setLanguage, setData}) => {
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const headerLanguage = setData(headerData)

  function closeMenu() {
    setActive(false)
  }

  const props = {
    language,
    setLanguage,
  }

  const handleClick = () => {
    setActive(!active);
    setOpen(true)
  }

  const classFinal = (active) ? 'menu active' : 'menu';

  return (
    <>
    <Container active={active} className="header-fixed">
     
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

        <nav className={active ? 'active' : (open ? 'inactive' : '')}>
          <NavHashLink smooth to="#home" onClick={closeMenu}>
            {headerLanguage.home}
          </NavHashLink>
          <NavHashLink smooth to="#about" onClick={closeMenu}>
            {headerLanguage.about}
          </NavHashLink>
          <NavHashLink smooth to="#portfolio" onClick={closeMenu}>
            {headerLanguage.portfolio}
          </NavHashLink>
          <NavHashLink smooth to="#contact" onClick={closeMenu}>
            {headerLanguage.contact}
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

        <div id="closeButton"
          aria-expanded={active ? 'true' : 'false'}
          aria-haspopup="true"
          aria-label={active ? 'Close menu' : 'Open Menu'}
          className={classFinal}
          onClick={() => handleClick() }
        ></div>
      </Router>
    </Container></>
  )
}
