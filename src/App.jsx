import Header from './Header.jsx';
import Musiikkia from './musiikkia.jsx';
import Tietoa from './tietoa.jsx';
import Pelit from './pelit.jsx';
import Blogi from './blogi.jsx';
import React, { useEffect } from 'react';
import {HashRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Footer from './Footer.jsx';
import i18next from './i188n.jsx';
import { I18nextProvider } from 'react-i18next';

//

const useRouteChange = (setDropDown) => {
  const location = useLocation();

  useEffect(() => {
    // This will be triggered whenever the route changes
    setDropDown(false);
  }, [location]);
};

function RouteChangeHandler({setDropDown}) {
  useRouteChange(setDropDown); // Use the custom hook to track route changes
  return null;
}

function App() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [toggled, setToggled] = React.useState(prefersDark);
  const [DropdownActive, setDropDown] = React.useState(false);

    return(
      <>
      <Router>
        <RouteChangeHandler setDropDown={setDropDown} />
        <I18nextProvider i18n={i18next}>
        <Header toggled={toggled} setToggled={setToggled} DropdownActive = {DropdownActive} setDropDown={setDropDown}/>
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
