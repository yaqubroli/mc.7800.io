import React from 'react';
import ClipboardCopy from './ClipboardCopy';
import PrankButton from './PrankButton';
import SettingsPane from './SettingsPane';
import getClassName from '../utils/getClassName';

function MainDiv({ mode, characteristics, tendencies, setMode, setCharacteristics, setTendencies, mousePosition, windowSize, audio }) {
  return (
    <div
      className={getClassName("MainDiv", mode, characteristics, tendencies)}
      style= {{
        transform: 
          tendencies ? 
            "perspective(1000px) rotateX(" + ((mousePosition.y) - (windowSize.height / 2)) / 20 + "deg) rotateY(" + ((-1 * mousePosition.x) + (windowSize.width / 2)) / 20 + "deg)"
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)"
          ,
      }}
    >
      <div id="wrap">
      <h1>{
        mode === 0 ? "Swiss Town" :  
        mode === 1 ? "Sigma Town" : 
        mode === 2 ? "爱国华为官小分红习近平思想讨论组"
        : "Error"}
      </h1>
      </div>
      <h2>Server IP:</h2>
      <ClipboardCopy 
        copyText={"mc.7800.io"}
        tendencies={tendencies}
        characteristics={characteristics}
        audio={audio}
        mousePosition={mousePosition}
      />
      <small id="ip-tagline">version 1.19.4, port 25565</small>
      <a className="main-button-style" href="/whitelist">Join the whitelist</a>
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
      <a id="yaqub" href="https://yaqubro.li">made on the island of patmos 6,600 years ago</a>
    </div>
  );
}

export default MainDiv;
