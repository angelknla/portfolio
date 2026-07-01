import type { AvailableLanguages } from './dropdownData';

export const aboutData: Record<AvailableLanguages, Record<string, any>> = {
  english: {
    title: 'About me',
    p1: 'Full Stack Software Engineer specializing in React, Next.js, TypeScript, and cloud-native architectures, with experience building scalable, high-quality web products that deliver measurable business value.',
    p2: 'Currently at The LEGO Group, developing customer-facing experiences that combine pixel-perfect UI with accessibility, performance, and maintainability.',
    p3: "I'm passionate about modern software engineering practices, including AI-assisted development, agentic workflows, automated testing, and CI/CD. I actively leverage LLMs and agentic approaches to accelerate implementation, automate repetitive engineering tasks, improve developer productivity, and enhance software quality while keeping human oversight central to technical decision-making.",
    p4: {
      title: 'TECHNICAL SKILLS',
      content:
        ' - Front-end technologies, such as JavaScript, TypeScript, React JS, Redux,  mark-up/styling languages such as HTML5, XML and CSS.',
    },
    p5: '- Frameworks, such as Next JS, Node JS, Express JS, Jest and Cypress testing, database technologies such as MySQL or MongoDB.',
    h3: 'These are my main skills:',
  },
  spanish: {
    title: 'Sobre mi',
    p1: 'Ingeniero de Software Full Stack especializado en React, Next.js, TypeScript y arquitecturas cloud-native, con experiencia construyendo productos web escalables y de alta calidad que generan valor de negocio medible.',
    p2: 'Actualmente en The LEGO Group, desarrollando experiencias orientadas al cliente que combinan una interfaz de usuario perfecta al píxel con accesibilidad, rendimiento y mantenibilidad.',
    p3: 'Me apasionan las prácticas modernas de ingeniería de software, incluyendo el desarrollo asistido por IA, los flujos de trabajo agénticos, las pruebas automatizadas y CI/CD. Aprovecho activamente los LLMs y enfoques agénticos para acelerar la implementación, automatizar tareas de ingeniería repetitivas, mejorar la productividad del desarrollador y elevar la calidad del software, manteniendo la supervisión humana como eje central de la toma de decisiones técnicas.',
    p4: {
      title: 'HABILIDADES TECNICAS',
      content:
        '- Tecnologías front-end, como JavaScript, TypeScript, React JS, Redux, lenguajes de marcado/estilo como HTML5, XML y CSS.',
    },
    p5: '- Frameworks, como Next JS, Node JS, Express JS, Jest y Cypress testing, tecnologías de bases de datos como MySQL o MongoDB.',
    h3: 'Estas son mis habilidades principales:',
  },
  japanese: {
    title: '私について',
    p1: 'React、Next.js、TypeScript、クラウドネイティブアーキテクチャを専門とするフルスタックソフトウェアエンジニアです。測定可能なビジネス価値をもたらす、スケーラブルで高品質なウェブ製品の構築経験を持ちます。',
    p2: '現在はThe LEGO Groupに在籍し、ピクセルパーフェクトなUIとアクセシビリティ、パフォーマンス、保守性を兼ね備えた顧客向けエクスペリエンスを開発しています。',
    p3: 'AIを活用した開発、エージェント型ワークフロー、自動テスト、CI/CDなど、モダンなソフトウェアエンジニアリングの実践に情熱を持っています。LLMやエージェント的アプローチを積極的に活用して実装を加速し、反復的なエンジニアリングタスクを自動化し、開発者の生産性を向上させ、ソフトウェアの品質を高めながら、技術的意思決定において人間の監督を中心に据えています。',
    p4: {
      title: '技術的なスキル',
      content:
        '- JavaScript、TypeScript、React JS、Redux などのフロントエンド技術、HTML5、XML、CSS などのマークアップ/スタイリング言語.',
    },
    p5: '- Next JS、Node JS、Express JS、Jest、Cypress テストなどの rameworks、MySQL や MongoDB などのデータベース技術.',
    h3: 'これらは私のメインスキルです:',
  },
};
