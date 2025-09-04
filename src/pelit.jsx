import React from 'react';
import './App.css'
import { useTranslation } from 'react-i18next';

function Pelit({toggled}) {
    const {t, i18n} = useTranslation("global");

    return (
        <>
            <div className='app'>
                <div className='tietoa'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className='title'>{t("header.pelit")}</div>
                            <div className='title2'>Take care of horse</div>
                            <div className={`game ${toggled? "dark" : ""}`}>
                                <iframe
                                    src='webglunity/Takecareofhorse/index.html'
                                    width="1280"
                                    height="720">

                                </iframe>
                            </div>
                            <p>{t("pelit.takecareofhorsedesc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Pelit