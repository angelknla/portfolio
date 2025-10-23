import type { AvailableLanguages } from "./dropdownData";

export const aboutData: Record<AvailableLanguages, Record<string, any>> = {
	english: {
		title: "About me",
		p1: "Software Engineer with 4+ years of experience who loves building great products. At The LEGO Group, I work full-stack with a frontend focus — using React, TypeScript, and Next.js to create fast, accessible experiences for millions of users.",
		p2: "I care about quality: performance, clean code, and accessibility. I'm big on using the right tools to work smarter. — AI tools like Claude Sonnet have been game-changers for learning faster and shipping better code.",
		p3: "My strengths lie in interpersonal, written communication, outstanding problem-solving skills, and creativity. I also have solid backend experience with Node.js and AWS, and a track record of shipping features that boost conversion rates and revenue.",
		p4: {
			title: "TECHNICAL SKILLS",
			content:
				" - Front-end technologies, such as JavaScript, TypeScript, React JS, Redux,  mark-up/styling languages such as HTML5, XML and CSS.",
		},
		p5: "- Frameworks, such as Next JS, Node JS, Express JS, Jest and Cypress testing, database technologies such as MySQL or MongoDB.",
		h3: "These are my main skills:",
	},
	spanish: {
		title: "Sobre mi",
		p1: "Soy un solucionador de problemas innovador al que le gusta probar y experimentar con análisis y evaluar exhaustivamente, confirmando ideas y creando planes paso a paso.",
		p2: "Muy bien familiarizado con formas ágiles de trabajo como Scrum y Kanban, experiencia trabajando con sistemas informáticos, estructuras de datos, análisis de requisitos del sistema y desarrollo de aplicaciones web.",
		p3: "Mis fortalezas radican en la comunicación interpersonal y escrita, excelentes habilidades para resolver problemas y creatividad. Tengo habilidades superiores de organización y experiencia trabajando bajo presión como parte de un equipo.",
		p4: {
			title: "HABILIDADES TECNICAS",
			content:
				"- Tecnologías front-end, como JavaScript, TypeScript, React JS, Redux, lenguajes de marcado/estilo como HTML5, XML y CSS.",
		},
		p5: "- Frameworks, como Next JS, Node JS, Express JS, Jest y Cypress testing, tecnologías de bases de datos como MySQL o MongoDB.",
		h3: "Estas son mis habilidades principales:",
	},
	japanese: {
		title: "私について",
		p1: "私は革新的な問題解決者であり、徹底的な分析と評価をテストして実験し、アイデアを確認し、段階的な計画を作成するのが好きです.",
		p2: "スクラムやかんばんなどのアジャイルな作業方法に精通していること、コンピューター システム、データ構造、システム要件の分析、Web ベースのアプリケーションの開発に関する経験がある.",
		p3: "私の強みは、対人関係、書面によるコミュニケーション、優れた問題解決能力、および創造性にあります。私はチームの一員としてプレッシャーの下で働いた優れた組織力と経験を持っています.",
		p4: {
			title: "技術的なスキル",
			content:
				"- JavaScript、TypeScript、React JS、Redux などのフロントエンド技術、HTML5、XML、CSS などのマークアップ/スタイリング言語.",
		},
		p5: "- Next JS、Node JS、Express JS、Jest、Cypress テストなどの rameworks、MySQL や MongoDB などのデータベース技術.",
		h3: "これらは私のメインスキルです:",
	},
};
