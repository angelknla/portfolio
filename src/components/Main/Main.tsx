import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
import { Hero } from "../Hero/Hero";
import { Portfolio } from "../Portfolio/Portfolio";
import styles from "./Main.module.css";

export const Main = () => {
	return (
		<main className={styles.container}>
			<Hero />
			<About />
			<Portfolio />
			<Contact />
		</main>
	);
};
