import type { AvailableLanguages } from './dropdownData';

export const aboutData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    title: 'About me',
    p1: 'Full Stack Software Engineer with 5+ years building high-scale digital products used by millions of customers, specializing in React, Next.js, TypeScript, and serverless AWS architectures.',
    p2: 'Currently leading engineering initiatives at The LEGO Group — owning complex features from architecture through production, mentoring engineers, raising engineering standards, and driving technical decisions across squads.',
    p3: 'I combine strong technical execution with engineering leadership, with a bias toward clean architecture, event-driven systems, and software built to last. An advocate for modern engineering practices — AI-assisted development, agentic workflows, automated testing, and CI/CD — I actively leverage LLMs to accelerate delivery and elevate quality, while keeping human judgement central to technical decision-making.',
    p4: {
      title: 'TECHNICAL SKILLS',
      content:
        ' - Front-end technologies, such as JavaScript, TypeScript, React JS, Redux,  mark-up/styling languages such as HTML5, XML and CSS.',
    },
    p5: '- Frameworks, such as Next JS, Node JS, Express JS, Jest and Cypress testing, database technologies such as MySQL or MongoDB.',
    h3: 'These are my main skills:',
    pGames: {
      before:
        "I'm a big fan of videogames and enjoy coding them in my spare time. I've built four basic classic-inspired games that were a fun way to flex my coding, game design, and problem-solving skills — you can try them out in the portfolio ",
      link: 'section below',
      after: '.',
    },
  },
  spanish: {
    title: 'Sobre mí',
    p1: 'Ingeniero de Software Full Stack con más de 5 años construyendo productos digitales de gran escala usados por millones de personas, especializado en React, Next.js, TypeScript y arquitecturas serverless en AWS.',
    p2: 'Actualmente liderando iniciativas de ingeniería en The LEGO Group — asumiendo la responsabilidad de features complejas desde la arquitectura hasta producción, mentoreando a otros ingenieros, elevando los estándares de ingeniería y guiando decisiones técnicas entre squads.',
    p3: 'Combino ejecución técnica sólida con liderazgo de ingeniería, con inclinación por la arquitectura limpia, los sistemas basados en eventos y el software construido para durar. Defensor de las prácticas modernas de ingeniería —desarrollo asistido por IA, flujos con agentes autónomos, pruebas automatizadas y CI/CD—, aprovecho activamente los LLMs para acelerar la entrega y elevar la calidad, manteniendo el criterio humano como eje central de la toma de decisiones técnicas.',
    p4: {
      title: 'HABILIDADES TÉCNICAS',
      content:
        '- Tecnologías front-end, como JavaScript, TypeScript, React JS, Redux, lenguajes de marcado/estilo como HTML5, XML y CSS.',
    },
    p5: '- Frameworks, como Next JS, Node JS, Express JS, Jest y Cypress testing, tecnologías de bases de datos como MySQL o MongoDB.',
    h3: 'Estas son mis habilidades principales:',
    pGames: {
      before:
        'Soy un gran fan de los videojuegos y disfruto programándolos en mi tiempo libre. He creado cuatro juegos básicos de inspiración clásica, una forma divertida de practicar mis habilidades de programación, diseño de juegos y resolución de problemas — puedes probarlos en la ',
      link: 'sección de portfolio más abajo',
      after: '.',
    },
  },
  japanese: {
    title: '私について',
    p1: '5年以上にわたり、数百万のユーザーが利用する大規模なデジタルプロダクトを構築してきたフルスタックソフトウェアエンジニアです。React、Next.js、TypeScript、およびサーバーレスAWSアーキテクチャを専門としています。',
    p2: '現在はThe LEGO Groupでエンジニアリングイニシアチブをリード — 複雑な機能をアーキテクチャから本番リリースまで一貫して担当し、エンジニアの育成、エンジニアリング水準の向上、そしてスクワッドを横断する技術的意思決定を主導しています。',
    p3: '強い技術的な実行力とエンジニアリングリーダーシップを兼ね備え、クリーンアーキテクチャ、イベント駆動型システム、長く使い続けられるソフトウェアを重視しています。AIを活用した開発、エージェント型ワークフロー、自動テスト、CI/CDといったモダンなエンジニアリングの実践を推進し、LLMを積極的に活用してデリバリーを加速し品質を高める一方で、技術的意思決定においては常に人間の判断を中心に据えています。',
    p4: {
      title: '技術的なスキル',
      content:
        '- JavaScript、TypeScript、React JS、Redux などのフロントエンド技術、HTML5、XML、CSS などのマークアップ/スタイリング言語.',
    },
    p5: '- Next JS、Node JS、Express JS、Jest、Cypress テストなどの rameworks、MySQL や MongoDB などのデータベース技術.',
    h3: 'これらは私のメインスキルです:',
    pGames: {
      before:
        'ビデオゲームが大好きで、趣味でコーディングを楽しんでいます。コーディング、ゲームデザイン、問題解決のスキルを幅広く活かす楽しい方法として、クラシック風のシンプルな小ゲームを4つ制作しました。これらは',
      link: '以下のポートフォリオセクション',
      after: 'でお試しいただけます。',
    },
  },
};
