import React, { createContext, useState } from 'react';
import moonTheme from './assets/Moon.png';
import sunTheme from './assets/Sun.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header({toggled, setToggled}) {
    const {t, i18n} = useTranslation("global");
    const handleClick = () => {
        setToggled((s) => !s);
    };
    const languages=['en','fi'];
    const [currentLanguageIndex, setCurrentIndex] = useState(1);

    const setLanguage = () => {
        const nextIndex = (currentLanguageIndex + 1) % languages.length;
        i18n.changeLanguage(languages[nextIndex]);
        setCurrentIndex(nextIndex);
    }

    document.body.classList = toggled ? "darkBody dark" : "";
    return (
        <div className={`header`} >
            <Link draggable="false" to="/" className={`navTitleButton ${toggled ? "dark" : ""}`}>
                <div className={`title`} >JoniNrd</div>
            </Link>
            <Link draggable="false" to="/tietoa" className='navButton'>
                <div >{t("header.tietoa")}</div>
            </Link>
            <a href="#" className='navButton'>
                <div >{t("header.projektit")}</div>
            </a>
            <Link draggable="false" to="/pelit" className='navButton'>
                <div >{t("header.pelit")}</div>
            </Link>
            <Link draggable="false" to="/musiikkia" className={`navButton`}>
                <div >{t("header.musiikkia")}</div>
            </Link>
            <Link draggable="false" to="/blogi" className={`navButton`}>
                <div >{t("header.blogi")}</div>
            </Link>
            <div className={`lang${toggled ? " dark" : ""}`}>
                <button onClick={setLanguage}>
                    <div className='langSize'>
                        <img src={`${currentLanguageIndex ? "fi.svg" : "en.svg"}`} className='logo' draggable="false" />
                    </div>
                </button>
            </div>
            <div className={`theme${toggled ? "" : ""}`}>
                <button onClick={handleClick}>
                    <img src={`${toggled ? moonTheme : sunTheme}`} className='logo' draggable="false" />
                </button>
            </div>
        </div>
    );
}

export default Header;