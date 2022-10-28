import React, { useEffect, useState } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header, HeaderProps } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { flagsData } from './data/dropdownData'

function App() {
  const [language, setLanguage] = useState(flagsData[0].flag);

   useEffect(() => {
    setLanguage(language)
  }, [language, setLanguage])

  const setData = (data: any): any =>  {
    var personalData;
    switch(language) {
      case flagsData[0].flag:
      personalData = data.english;
      break;
    case flagsData[1].flag:
      personalData = data.spanish;
      break;
    case flagsData[2].flag:
      personalData = data.japanese;
      break;
    default:
      personalData = data.english
    }
    return personalData;
  }

  const generalProps = {
    language,
    setData,
  }
  
  const headerProps: HeaderProps = {
    ...generalProps,
    setLanguage,
  };

  

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Header {...headerProps}></Header>
      <Main {...generalProps}></Main>
      <Footer></Footer>
    </>
  )
}

export default App
