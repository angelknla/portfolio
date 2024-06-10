import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { GlobalStyle } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";

import { LanguageProvider } from "./contexts/Language";

const App = () => {
  return (
    <LanguageProvider>
      <GlobalStyle></GlobalStyle>
      <Header />
      <Main />
      <Footer />
    </LanguageProvider>
  );
};

export default App;
