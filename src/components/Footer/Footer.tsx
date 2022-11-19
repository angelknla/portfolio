import { Container } from './styles'

import linkedinIcon from '../../assets/linkedin.png'
import githubIcon from '../../assets/github.png'
import instagramIcon from '../../assets/instagram.png'
import { FC } from 'react'
import { footerData } from '../../data/footerData'

interface FooterProps {
  setData: (data: any) => any;
}

export const Footer: FC<FooterProps> = ({setData}) => {

  const data = setData(footerData)
  return (
    <Container className="footer">
      <a href="/" className="logo">
        <span>Angel</span>
        <span> Canela</span>
      </a>
      <div>
        <p>
          {data.message}
        </p>
      </div>

      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/angel-canela/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} alt="Linkedin" />
        </a>

        <a
          href="https://github.com/angelknla"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>

        <a
          href="b"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </Container>
  )
}
