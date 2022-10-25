import externalLinkIcon from "../assets/external-link-icon.svg"
import { ProjectCardProps } from "../components/Portfolio/ProjectCard";

export const data: Array<ProjectCardProps>= [
  {
    title: "Kizuna",
    description: "A motivational Remote Working Employee Support System. (End of degree project) This application offers feedback and gamification with a reward programme.",
    techStack: ["Node", "Express", "MongoDB", "Ejs", "CSS"]
  },
  {
    title: "Simon",
    description: "Exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order.",
    techStack: ["HTML5", "JavaScript", "CSS"]
  },
  {
    title: "Drum Kit",
    description: "Play the virtual drum kit using your computer keyboard.",
    techStack: ["HTML5", "JavaScript", "CSS"]
  },
  { 
    iconSvg: externalLinkIcon,
    iconAlt: "Visit site",
    title: "Portfolio",
    description: "My own portfolio, using React, Typescript and Styled Components.",
    techStack: ["React", "TypeScript", "Styled Components"]
  },
  { 
    title: "Secrets Page",
    description: "Web site where you can write your secrets and see others secrets using cards.",
    techStack: ["React", "JavaScript", "EJS"]
  },
  { 
    title: "ToDo List App",
    description: "Simple app where you can create a toDO list.",
    techStack: ["HTML5", "JavaScript", "CSS"]
  },
];