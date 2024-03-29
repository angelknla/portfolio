import { BrowserRouter } from "react-router-dom";
import { Container } from "./styles";
import ScrollAnimation from "react-animate-on-scroll";
import Illustration from "../../assets/illustration.svg";
import { NavHashLink } from "react-router-hash-link";
import { FC } from "react";
import { heroData } from "../../data/heroData";
import { staticflagsData } from "../../data/dropdownData";

export interface HeroProps {
  language: string;
  setData: (data: any) => any;
}

export const Hero: FC<HeroProps> = ({language, setData}) => {
  const personalData = setData(heroData)
  
  return(
    <Container id="home">
      <div className="hero-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <p>{personalData.greeting}</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.2*1000}>
          <h1>{personalData.name}</h1>
        </ScrollAnimation>
        {language === staticflagsData[2] && 
        <ScrollAnimation animateIn="fadeInLeft">
          <p className="japanese">です</p>
        </ScrollAnimation>
        }
        <ScrollAnimation animateIn="fadeInUp" delay={0.3 * 1000}>
          <h3>{personalData.job}</h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
          <p className="small-resume">{personalData.intro}</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInUp" delay={0.5*1000}>
          <BrowserRouter>
            <NavHashLink smooth to="#contact" className="button">{personalData.contact}</NavHashLink>
            </BrowserRouter>
        </ScrollAnimation>
      </div>
      <div className="hero-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.2*1000}>
          <img src={Illustration} alt="Ilustration"/>
        </ScrollAnimation>
      </div>
    </Container>
  )
}