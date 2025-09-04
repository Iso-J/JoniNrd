import React from 'react';
import toggled from './Header.jsx';
import './App.css'
import { useTranslation } from 'react-i18next';

function Musiikkia() {
    return (
        <div className='app'>
            <div className='musiikkia'>
                <div className={`background`}>
                    <div className='content'>
                        <div className='title'>Pieniä näytteitä musiikistani</div>
                        <div>
                            <p>Tie avaruuteen</p>
                            <audio controls>
                                <source src="./audio/tieavaruuteennayte.wav" type="audio/wav"></source>
                            </audio>
                        </div>

                        <div>
                            <p>Nimetön1</p>
                            <audio controls>
                                <source src="./audio/nimeton1.wav" type="audio/wav"></source>
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Musiikkia