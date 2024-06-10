import { Container } from "./styles";
import { Hero } from "../Hero/Hero";
import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
import { Portfolio } from "../Portfolio/Portfolio";
import { ParticlesBG } from "../Particles/Particles";

export const Main = () => {
  return (
    <Container>
      <ParticlesBG />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </Container>
  );
};
