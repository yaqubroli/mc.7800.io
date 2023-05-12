import React from 'react';
import ClipboardCopy from './ClipboardCopy';
import PrankButton from './PrankButton';
import SettingsPane from './SettingsPane';
import getClassName from '../utils/getClassName';
import MainUI from './MainUI';
import WhitelistUI from './WhitelistUI';

function MainDiv({ mode, characteristics, tendencies, joinWhitelist, setMode, setCharacteristics, setTendencies, setJoinWhitelist, mousePosition, windowSize, audio }) {

  const [whitelistUI, setWhitelistUI] = React.useState(false);

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
      { whitelistUI ? <WhitelistUI /> :
      <MainUI
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        joinWhitelist={whitelistUI}
        setMode={setMode}
        setCharacteristics={setCharacteristics}
        setTendencies={setTendencies}
        setWhitelistUI={setWhitelistUI}
        audio={audio}
      /> }
    </div>
  );
}

export default MainDiv;
