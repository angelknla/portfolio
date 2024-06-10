import { BrowserRouter } from "react-router-dom";
import { Container } from "./styles";
import ScrollAnimation from "react-animate-on-scroll";
import Illustration from "../../assets/illustration.svg";
import { NavHashLink } from "react-router-hash-link";
import { heroData } from "../../data/heroData";
import { useLanguage } from "../../contexts/Language";

export const Hero = () => {
  const { language, translations } = useLanguage(heroData);

  return (
    <Container id="home">
      <div className="hero-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <p>{translations?.greeting}</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.2 * 1000}>
          <h1>{translations?.name}</h1>
        </ScrollAnimation>
        {language.language === "japanese" && (
          <ScrollAnimation animateIn="fadeInLeft">
            <p className="japanese">です</p>
          </ScrollAnimation>
        )}
        <ScrollAnimation animateIn="fadeInUp" delay={0.3 * 1000}>
          <h3>{translations?.job}</h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
          <p className="small-resume">{translations?.intro}</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInUp" delay={0.5 * 1000}>
          <BrowserRouter>
            <NavHashLink smooth to="#contact" className="button">
              {translations?.contact}
            </NavHashLink>
          </BrowserRouter>
        </ScrollAnimation>
      </div>
      <div className="hero-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.2 * 1000}>
          <img src={Illustration} alt="Ilustration" />
        </ScrollAnimation>
      </div>
    </Container>
  );
};
