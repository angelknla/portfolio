import { Container } from "./styles";

import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import nextIcon from "../../assets/nextjs-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import reduxIcon from "../../assets/redux.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import bootstrapIcon from "../../assets/bootstrap-icon.svg";
import ScrollAnimation from "react-animate-on-scroll";
import image from "../../assets/angelnew.jpg"
import { FC } from "react";
import { aboutData } from "../../data/aboutData";

interface AboutProps {
  setData: (data: any) => any;
}

export const About:FC<AboutProps> = ({setData}) => {

  const personalData = setData(aboutData);
  
  return(
    <Container id="about">
      <div className="about-text">

        <ScrollAnimation animateIn="fadeInLeft">
          <h2>{personalData.title}</h2>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.2 * 1000}>
          <p>{personalData.p1}</p>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInLeft" delay={0.3 * 1000} style={{marginTop: "2rem", marginBottom: "2rem"}}>
          <p>{personalData.p2}</p>
          </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.4 * 1000} style={{marginTop: "2rem", marginBottom: "2rem"}}>
          <p>{personalData.p3}</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.5 * 1000}>
          <p>{personalData.p4.title}<br></br>{personalData.p4.content}</p>
        </ScrollAnimation>

         <ScrollAnimation animateIn="fadeInLeft" delay={0.6 * 1000}>
           <br></br>
          <p>{personalData.p5}</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.7 * 1000}>
          <h3>{personalData.h3}</h3>
        </ScrollAnimation>

        <div className="hard-skills">

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.1 * 1000}>
              <img src={reactIcon} alt="React" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.2 * 1000}>
              <img src={reduxIcon} alt="Redux" />
            </ScrollAnimation>
          </div>

          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.3 * 1000}>
            <img src={bootstrapIcon} alt="Vue" />
          </ScrollAnimation>
          </div>

          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}> 
            <img src={jsIcon} alt="JavaScript" />
          </ScrollAnimation>
          </div>

          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.5 * 1000}>
            <img src={typescriptIcon} alt="Typescript" />
          </ScrollAnimation>
          </div>

          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.6 * 1000}> 
            <img src={htmlIcon} alt="Html" />
          </ScrollAnimation>
          </div>

          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.7 * 1000}> 
            <img src={cssIcon} alt="Css" />
          </ScrollAnimation>
          </div>
          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.8 * 1000}> 
            <img src={nodeIcon} alt="Node" />
          </ScrollAnimation>
          </div>
          <div className="hability">
          <ScrollAnimation animateIn="fadeInUp" delay={0.9 * 1000}> 
            <img src={nextIcon} alt="Node" />
          </ScrollAnimation>
          </div>

        </div>
      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.5 * 1000}>
          <img src={image} height="600px" alt="Profile pic" />
        </ScrollAnimation>
      </div>
    </Container>
  )
}
