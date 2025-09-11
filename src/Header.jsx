import React, { createContext, useEffect, useState } from 'react';
import moonTheme from '../public/Moon.png';
import sunTheme from '../public/Sun.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header({ toggled, setToggled, DropdownActive, setDropDown }) {
    const { t, i18n } = useTranslation("global");
    const handleClick = () => {
        setToggled((s) => !s);
    };
    const languages = ['en', 'fi'];
    const [currentLanguageIndex, setCurrentIndex] = useState(1);
    const inDev = import.meta.env.MODE === 'development';

    const setLanguage = () => {
        const nextIndex = (currentLanguageIndex + 1) % languages.length;
        i18n.changeLanguage(languages[nextIndex]);
        setCurrentIndex(nextIndex);
    }

    const handleDropdownClick = () => {
        setDropDown((s) => !s);
    };


    document.body.classList = toggled ? "darkBody dark" : "";
    return (
        <>
            <div className='header'>
                <div className={`headerTitle`} >
                    <Link draggable="false" to="/" className={`navTitleButton ${toggled ? "dark" : ""}`}>
                        <div className={`title`} >JoniNrd</div>
                    </Link>
                </div>

                <div className='allNavButtons'>
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
                    {inDev && (
                        <Link draggable="false" to="/luoBlogi" className={`navButton`}>
                            <div >{t("header.luoBlogi")}</div>
                        </Link>
                    )}
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
                <div className='navDropDown'>
                    <button onClick={handleDropdownClick}>
                        <div className='dropDownButton'>
                            |||
                        </div>
                    </button>
                </div>
            </div>
            {DropdownActive && (

                <div className='dropdown'>
                    <div className='allNavDropdownButtons'>
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
                    </div>
                    <div className='langThemeButtons'>
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
                </div>
            )}
        </>
    );
}

export default Header;