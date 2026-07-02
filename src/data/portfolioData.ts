import type { AvailableLanguages } from './dropdownData';

export const data: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    title: 'My Portfolio',
    tabs: { projects: 'Projects', games: 'Games' },
    games: [
      {
        title: 'Balloon Game',
        description:
          'Navigate your balloon through obstacles without touching the walls. Hold to rise, release to fall.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/balloon',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Play',
      },
      {
        title: 'Doroteyo',
        description:
          'Space shooter — destroy incoming planets by splitting them into smaller pieces before they reach the ground.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/doroteyo',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Play',
      },
      {
        title: 'Mario Game',
        description:
          'Classic platformer — jump between platforms and collect all the coins to advance to the next level.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/mario',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Play',
      },
      {
        title: 'Snake',
        description:
          'The timeless classic — eat the food, grow your snake, and avoid hitting the walls or yourself.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/snake',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Play',
      },
    ],
    cards: [
      {
        title: 'Kizuna',
        description:
          'A motivational Remote Working Employee Support System. (End of degree project) This application offers feedback and gamification with a reward programme.',
        techStack: ['Node', 'Express', 'MongoDB', 'Ejs', 'CSS'],
        href: 'https://github.com/angelknla/kizuna',
      },
      {
        title: 'Simon',
        description:
          'Exciting electronic game of lights and sounds in which players must repeat random sequences of lights by pressing the colored pads in the correct order.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/Simon',
      },
      {
        title: 'Drum Kit',
        description: 'Play the virtual drum kit using your computer keyboard.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/DrumKit',
      },
      {
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Visit site',
        title: 'Portfolio',
        description:
          'My own portfolio, using React, Typescript and Styled Components.',
        techStack: ['React', 'TypeScript', 'Styled Components'],
        href: 'https://github.com/angelknla/portfolio',
      },
      {
        title: 'Secrets Page',
        description:
          'Web site where you can write your secrets and see others secrets using cards.',
        techStack: ['React', 'JavaScript', 'EJS'],
        href: 'https://github.com/angelknla/secretsPage',
      },
      {
        title: 'ToDo List App',
        description: 'Simple app where you can create a toDO list.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/todoListApp',
      },
    ],
  },
  spanish: {
    title: 'Mi Porfolio',
    tabs: { projects: 'Proyectos', games: 'Juegos' },
    games: [
      {
        title: 'Juego del Globo',
        description:
          'Navega tu globo entre obstáculos sin tocar las paredes. Mantén pulsado para subir, suelta para bajar.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/balloon',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Jugar',
      },
      {
        title: 'Doroteyo',
        description:
          'Juego de disparos espaciales — destruye los planetas que se aproximan dividiéndolos en piezas más pequeñas.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/doroteyo',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Jugar',
      },
      {
        title: 'Juego de Mario',
        description:
          'Plataformas clásicas — salta entre plataformas y recoge todas las monedas para avanzar al siguiente nivel.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/mario',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Jugar',
      },
      {
        title: 'Snake',
        description:
          'El clásico atemporal — come la comida, haz crecer tu serpiente y evita chocar con las paredes o contigo mismo.',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/snake',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Jugar',
      },
    ],
    cards: [
      {
        title: 'Kizuna',
        description:
          'Un sistema motivacional de apoyo al empleado que trabaja a distancia. (Trabajo fin de carrera) Esta aplicación ofrece feedback y gamificación con un programa de recompensas.',
        techStack: ['Node', 'Express', 'MongoDB', 'Ejs', 'CSS'],
        href: 'https://github.com/angelknla/kizuna',
      },
      {
        title: 'Simon',
        description:
          'Emocionante juego electrónico de luces y sonidos en el que los jugadores deben repetir secuencias aleatorias de luces presionando las teclas de colores en el orden correcto.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/Simon',
      },
      {
        title: 'Kit de Batería',
        description:
          'Toca la batería virtual usando el teclado de tu computadora.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/DrumKit',
      },
      {
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Visit site',
        title: 'Porfolio',
        description:
          'Mi propio portafolio, usando React, Typescript y Styled Components.',
        techStack: ['React', 'TypeScript', 'Styled Components'],
        href: 'https://github.com/angelknla/portfolio',
      },
      {
        title: 'Pagina de secretos',
        description:
          'Sitio web donde puedes escribir tus secretos y ver otros secretos usando tarjetas.',
        techStack: ['React', 'JavaScript', 'EJS'],
        href: 'https://github.com/angelknla/secretsPage',
      },
      {
        title: 'ToDo List App',
        description:
          'Aplicación sencilla donde puedes crear una lista de tareas pendientes.',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/todoListApp',
      },
    ],
  },
  japanese: {
    title: 'ポートフォリオ',
    tabs: { projects: 'プロジェクト', games: 'ゲーム' },
    games: [
      {
        title: 'バルーンゲーム',
        description:
          '壁に触れずに障害物の間を風船で進もう。長押しで上昇、離すと下降。',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/balloon',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'プレイ',
      },
      {
        title: 'ドロテヨ',
        description:
          'スペースシューター — 近づいてくる惑星を小さな破片に分割して破壊しよう。',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/doroteyo',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'プレイ',
      },
      {
        title: 'マリオゲーム',
        description:
          'クラシックなプラットフォーマー — プラットフォームを飛び回ってコインを集め、次のレベルへ進もう。',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/mario',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'プレイ',
      },
      {
        title: 'スネーク',
        description:
          '不朽の名作 — 食べ物を食べてスネークを成長させ、壁や自分自身にぶつからないようにしよう。',
        techStack: ['React', 'TypeScript', 'Canvas'],
        href: '/games/snake',
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'プレイ',
      },
    ],
    cards: [
      {
        title: 'Kizuna',
        description:
          '社員のやる気を引き出すリモートワーク支援制度。 (学位プロジェクトの終了) このアプリケーションは、報酬プログラムでフィードバックとゲーミフィケーションを提供します.',
        techStack: ['Node', 'Express', 'MongoDB', 'Ejs', 'CSS'],
        href: 'https://github.com/angelknla/kizuna',
      },
      {
        title: 'Simon',
        description:
          '光と音のエキサイティングな電子ゲームで、プレーヤーは色付きのパッドを正しい順序で押して、光のランダムなシーケンスを繰り返さなければなりません。',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/Simon',
      },
      {
        title: 'Drum Kit',
        description:
          'コンピューターのキーボードを使用して仮想ドラム キットを演奏します。',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/DrumKit',
      },
      {
        iconSvg: '/assets/external-link-icon.webp',
        iconAlt: 'Visit site',
        title: 'ポートフォリオ',
        description:
          'React、Typescript、Styled Components を使用した私自身のポートフォリオ。',
        techStack: ['React', 'TypeScript', 'Styled Components'],
        href: 'https://github.com/angelknla/portfolio',
      },
      {
        title: 'Secrets Page',
        description:
          '自分の秘密を書いたり、カードを使って他の人の秘密を見たりできる Web サイト。',
        techStack: ['React', 'JavaScript', 'EJS'],
        href: 'https://github.com/angelknla/secretsPage',
      },
      {
        title: 'ToDo List App',
        description: 'toDOリストを作成できるシンプルなアプリ。',
        techStack: ['HTML5', 'JavaScript', 'CSS'],
        href: 'https://github.com/angelknla/todoListApp',
      },
    ],
  },
};
