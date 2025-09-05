import Header from './Header.jsx';
import Musiikkia from './musiikkia.jsx';
import Tietoa from './tietoa.jsx';
import Pelit from './pelit.jsx';
import Blogi from './blogi.jsx';
import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './Footer.jsx';
import i18next from './i188n.jsx';
import { I18nextProvider } from 'react-i18next';

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
          <Route path="/blogi"element={<Blogi/>}/>
        </Routes>
        <Footer/>
        </I18nextProvider>
      </Router>
      </>
    )
}

export default App
