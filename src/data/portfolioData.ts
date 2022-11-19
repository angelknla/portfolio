import externalLinkIcon from "../assets/external-link-icon.svg"
import { ProjectCardProps } from "../components/Portfolio/ProjectCard";

type PortfolioData = {
  english: {
    title: string;
    cards: Array<ProjectCardProps>;
  },
  spanish: {
    title: string;
    cards: Array<ProjectCardProps>;
  },
  japanese: {
    title: string;
    cards: Array<ProjectCardProps>;
  },
}

export const data: PortfolioData = {
  english: {
    title: 'My Portfolio',
    cards: [
   {
    title: "Kizuna",
    description: "A motivational Remote Working Employee Support System. (End of degree project) This application offers feedback and gamification with a reward programme.",
    techStack: ["Node", "Express", "MongoDB", "Ejs", "CSS"],
    href: "https://github.com/angelknla/kizuna"
  },
  {
    title: "Simon",
    description: "Exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/Simon"
  },
  {
    title: "Drum Kit",
    description: "Play the virtual drum kit using your computer keyboard.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/DrumKit"
  },
  { 
    iconSvg: externalLinkIcon,
    iconAlt: "Visit site",
    title: "Portfolio",
    description: "My own portfolio, using React, Typescript and Styled Components.",
    techStack: ["React", "TypeScript", "Styled Components"],
    href: "https://github.com/angelknla/portfolio"
  },
  { 
    title: "Secrets Page",
    description: "Web site where you can write your secrets and see others secrets using cards.",
    techStack: ["React", "JavaScript", "EJS"],
    href: "https://github.com/angelknla/secretsPage"
  },
  { 
    title: "ToDo List App",
    description: "Simple app where you can create a toDO list.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/todoListApp"
  },
  ]
}, 
  spanish: {
  title: 'Mi Porfolio',
  cards: [
   {
    title: "Kizuna",
    description: "Un sistema motivacional de apoyo al empleado que trabaja a distancia. (Trabajo fin de carrera) Esta aplicación ofrece feedback y gamificación con un programa de recompensas.",
    techStack: ["Node", "Express", "MongoDB", "Ejs", "CSS"],
    href: "https://github.com/angelknla/kizuna"
  },
  {
    title: "Simon",
    description: "Emocionante juego electrónico de luces y sonidos en el que los jugadores deben repetir secuencias aleatorias de luces presionando las teclas de colores en el orden correcto.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/Simon"
  },
  {
    title: "Kit de Batería",
    description: "Toca la batería virtual usando el teclado de tu computadora.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/DrumKit"
  },
  { 
    iconSvg: externalLinkIcon,
    iconAlt: "Visit site",
    title: "Porfolio",
    description: "Mi propio portafolio, usando React, Typescript y Styled Components.",
    techStack: ["React", "TypeScript", "Styled Components"],
    href: "https://github.com/angelknla/portfolio"
  },
  { 
    title: "Pagina de secretos",
    description: "Sitio web donde puedes escribir tus secretos y ver otros secretos usando tarjetas.",
    techStack: ["React", "JavaScript", "EJS"],
    href: "https://github.com/angelknla/secretsPage"
  },
  { 
    title: "ToDo List App",
    description: "Aplicación sencilla donde puedes crear una lista de tareas pendientes.",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/todoListApp"
  },
  ], 
},
  japanese: {
    title: 'ポートフォリオ',
    cards: [
   {
    title: "Kizuna",
    description: "社員のやる気を引き出すリモートワーク支援制度。 (学位プロジェクトの終了) このアプリケーションは、報酬プログラムでフィードバックとゲーミフィケーションを提供します.",
    techStack: ["Node", "Express", "MongoDB", "Ejs", "CSS"],
    href: "https://github.com/angelknla/kizuna"
  },
  {
    title: "Simon",
    description: "光と音のエキサイティングな電子ゲームで、プレーヤーは色付きのパッドを正しい順序で押して、光のランダムなシーケンスを繰り返さなければなりません。",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/Simon"
  },
  {
    title: "Drum Kit",
    description: "コンピューターのキーボードを使用して仮想ドラム キットを演奏します。",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/DrumKit"
  },
  { 
    iconSvg: externalLinkIcon,
    iconAlt: "Visit site",
    title: "ポートフォリオ",
    description: "React、Typescript、Styled Components を使用した私自身のポートフォリオ。",
    techStack: ["React", "TypeScript", "Styled Components"],
    href: "https://github.com/angelknla/portfolio"
  },
  { 
    title: "Secrets Page",
    description: "自分の秘密を書いたり、カードを使って他の人の秘密を見たりできる Web サイト。",
    techStack: ["React", "JavaScript", "EJS"],
    href: "https://github.com/angelknla/secretsPage"
  },
  { 
    title: "ToDo List App",
    description: "toDOリストを作成できるシンプルなアプリ。",
    techStack: ["HTML5", "JavaScript", "CSS"],
    href: "https://github.com/angelknla/todoListApp"
  },
  ], 
}
};