import { Container, StyledLinkedIn } from './styles'
import { BrowserRouter as Router } from 'react-router-dom'
import linkedinIcon from '../../assets/linkedin.png'
import { NavHashLink, HashLink } from 'react-router-hash-link'
import { useState } from 'react'

import CV from '../../assets/Angel_CV_2022New.pdf'

export function toggleTheme() {
    let html = document.getElementsByTagName('html')[0]
    html.classList.toggle('light')
  }

export function Header() {
  const [active, setActive] = useState(false)

  function closeMenu() {
    setActive(false)
  }

  return (
    <Container className="header-fixed">
      <Router>
        <HashLink smooth to="#home" className="logo">
          <span>Angel</span>
          <span> Canela</span>
        </HashLink>

        <input
          onChange={toggleTheme}
          className="container_toggle"
          type="checkbox"
          id="switch"
          name="mode"
        />
        <label htmlFor="switch">Toggle</label>

        <nav className={active ? 'active' : ''}>
          <NavHashLink smooth to="#home" onClick={closeMenu}>
            Home
          </NavHashLink>
          <NavHashLink smooth to="#about" onClick={closeMenu}>
            About me
          </NavHashLink>
          <NavHashLink smooth to="#portfolio" onClick={closeMenu}>
            Portfolio
          </NavHashLink>
          <NavHashLink smooth to="#contact" onClick={closeMenu}>
            Contact
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
        </nav>

        <div
          aria-expanded={active ? 'true' : 'false'}
          aria-haspopup="true"
          aria-label={active ? 'Close menu' : 'Open Menu'}
          className={active ? 'menu active' : 'menu'}
          onClick={() => {
            setActive(!active)
          }}
        ></div>
      </Router>
    </Container>
  )
}
