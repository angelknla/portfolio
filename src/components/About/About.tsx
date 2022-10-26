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
import image from "../../assets/angel_new.jpg"


export function About(){
  return(
    <Container id="about">
      <div className="about-text">

        <ScrollAnimation animateIn="fadeInLeft">
          <h2>About me</h2>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.2 * 1000}>
          <p>I am an innovative problem solver that likes to test and experiment with thorough analysis and evaluation, confirming ideas and creating step-by-step plans.</p>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInLeft" delay={0.3 * 1000} style={{marginTop: "2rem", marginBottom: "2rem"}}>
          <p>Familiar working with Agile ways of working such as Scrum and Kanban, experience working with computer systems, data structures, analysing system requirements and developing Web-based applications.</p>
          </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.4 * 1000} style={{marginTop: "2rem", marginBottom: "2rem"}}>
          <p>My strengths lie in interpersonal, written communication, outstanding problem-solving skills, and creativity. I have superior organisation skills and experience working under pressure as part of a team.</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.5 * 1000}>
          <p>TECHNICAL SKILLS<br></br> - Front-end technologies, such as JavaScript, TypeScript, React JS, Redux,  mark-up/styling languages such as HTML5, XML and CSS.</p>
        </ScrollAnimation>

         <ScrollAnimation animateIn="fadeInLeft" delay={0.6 * 1000}>
           <br></br>
          <p>- Frameworks, such as Next JS, Node JS, Express JS, Jest and Cypress testing, database technologies such as MySQL or MongoDB.</p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.7 * 1000}>
          <h3>These are my main skills:</h3>
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
