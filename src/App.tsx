import React, { useEffect, useState } from 'react'
import { Footer } from './components/Footer/Footer'
import { Header, HeaderProps } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { GlobalStyle } from './styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { flagsData, staticflagsData } from './data/dropdownData'

function App() {
  const [language, setLanguage] = useState(flagsData[0]);

   useEffect(() => {
    setLanguage(language)
  }, [language, setLanguage])

  const setData = (data: any): any =>  {
    var personalData;
    switch(language) {
      case flagsData[flagsData.indexOf(staticflagsData[0])]:
      personalData = data.english;
      break;
    case flagsData[flagsData.indexOf(staticflagsData[1])]:
      personalData = data.spanish;
      break;
    case flagsData[flagsData.indexOf(staticflagsData[2])]:
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
