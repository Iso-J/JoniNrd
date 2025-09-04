import React from 'react';
import toggled from './Header.jsx';
import './tietoa.css'
import './App.css'
import { useTranslation } from 'react-i18next';

function Tietoa() {
    const {t, i18n} = useTranslation("global");
    
    return (
        <>
            <div className='app'>
                <div className='tietoa'>
                    <div className={`background`}>
                        <div className='content'>
                            <div className='title'>{t("header.tietoa")}</div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Tietoa