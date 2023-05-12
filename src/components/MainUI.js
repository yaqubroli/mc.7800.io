import React from 'react';
import ClipboardCopy from './ClipboardCopy';
import PrankButton from './PrankButton';
import SettingsPane from './SettingsPane';
import getClassName from '../utils/getClassName';

function MainUI({ mode, characteristics, tendencies, setMode, setCharacteristics, setTendencies, setWhitelistUI, mousePosition, windowSize, audio }) {

  return (
    <div
      className={getClassName("MainUI", mode, characteristics, tendencies)}
    >
      <h1>{
        mode === 0 ? "Swiss Town" :  
        mode === 1 ? "Sigma Town" : 
        mode === 2 ? "爱国华为官小分红习近平思想讨论组"
        : "Error"}
      </h1>
      <h2>Server IP:</h2>
      <ClipboardCopy 
        copyText={"mc.7800.io"}
        tendencies={tendencies}
        characteristics={characteristics}
        audio={audio}
        mousePosition={mousePosition}
      />
      <small id="ip-tagline">version 1.19.4, port 25565</small>
      <span className="main-button-style" onClick={() => setWhitelistUI(true)}>Join the whitelist</span>
      <a className="main-button-style" href="/dynmap">View the dynmap</a>
      <PrankButton characteristics={characteristics} audio={audio}/>
      <SettingsPane
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        setMode={setMode}
        setCharacteristics={setCharacteristics}
        setTendencies={setTendencies}
        audio={audio}
      />
    </div>
  );
}

export default MainUI;