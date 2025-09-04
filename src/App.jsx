import Header from './Header.jsx';
import Musiikkia from './musiikkia.jsx';
import Tietoa from './tietoa.jsx';
import Pelit from './pelit.jsx';
import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './Footer.jsx';
import global_fi from "./translations/fi/global.json";
import global_en from "./translations/en/global.json";
import i18next from "i18next";
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
.use(LanguageDetector)
.init({
  interpolation:{escapeValue:false},
  fallbackLng: 'en',
  resources:{
    en:{
      global: global_en,
    },
    fi:{
      global: global_fi,
    }, 
  },
});

//

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [toggled, setToggled] = React.useState(prefersDark);
  

    return(
      <>
      <Router>
        <I18nextProvider i18n={i18next}>
        <Header toggled={toggled} setToggled={setToggled}/>
        <Routes>
          <Route path="/"element={
            <>
            </>
            }/>
          <Route path="/tietoa"element={<Tietoa/>}/>
          <Route path="/musiikkia"element={<Musiikkia/>}/>
          <Route path="/pelit"element={<Pelit toggled={toggled}/>}/>
        </Routes>
        <Footer/>
        </I18nextProvider>
      </Router>
      </>
    )
}

export default App
