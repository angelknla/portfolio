import React, { useEffect, useState } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header, toggleTheme } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  toggleTheme()
  const [language, setLanguage] = useState('eng');

  const props = {
    language,
    setLanguage,
  };

   useEffect(() => {
    setLanguage(language)
  }, [language, setLanguage])

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Header {...props}></Header>
      <Main language={language}></Main>
      <Footer></Footer>
    </>
  )
}

export default App
