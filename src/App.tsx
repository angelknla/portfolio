import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { LanguageProvider } from "./contexts/Language";
import "./styles/global.css";

const App = () => {
	return (
		<LanguageProvider>
			<Header />
			<Main />
			<Footer />
		</LanguageProvider>
	);
};

export default App;
