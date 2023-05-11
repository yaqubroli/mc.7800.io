import React, { useState, useEffect } from 'react';
import BGElem from './components/BGElem';
import BGOverlay from './components/BGOverlay';
import MainDiv from './components/MainDiv';
import MouseFollower from './components/MouseFollower';
import Gatito from './components/Gatito';
import useMousePosition from './hooks/useMousePosition';
import useWindowSize from './hooks/useWindowSize';
import useAudio from './hooks/useAudio';
import getClassName from './utils/getClassName';

function App() {

  // State variables glossary:
  // mode: the current mode
  // -- 0: swiss bingus mode
  // -- 1: swag floppa mode
  // -- 2: maoist sploingus mode
  // characteristics: music enable/disable
  // -- true: music enabled
  // -- false: music disabled
  // tendencies: tendencies enable/disable
  // -- true: tendencies enabled
  // -- false: tendencies disabled

  // shitty async function that waits 50ms before returning useState(0);
  // this is to prevent the audio from playing before the user clicks
  // the button to enable it

  const [mode, setMode] = useState(0);
  const [characteristics, setCharacteristics] = useState(true);
  const [tendencies, setTendencies] = useState(true);

  const mousePosition = useMousePosition();
  const windowSize = useWindowSize();

  const vineboom = new Audio("/mp3/vineboom.mp3");
  
  return (
    <div className={getClassName("App", mode, characteristics, tendencies)}>
      {mode === 0 ?
      <audio autoPlay={true} loop={true} muted={
        (mode === 0 && characteristics) ? false : true
        }>
        <source src="/mp3/phonkcore.mp3" type="audio/mpeg" />
      </audio> : null}
      {mode === 1 ?
      <audio autoPlay={true} loop={true} muted={
        (mode === 1 && characteristics) ? false : true
        }>
        <source src="/mp3/maskoff.mp3" type="audio/mpeg" />
      </audio> : null}
      <BGElem
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        mousePosition={mousePosition}
        windowSize={windowSize}
      />
      <BGOverlay
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        mousePosition={mousePosition}
        windowSize={windowSize}
        bottomness={true}
      />
      <BGOverlay
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        mousePosition={mousePosition}
        windowSize={windowSize}
        bottomness={false}
      />
      <MainDiv
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        setMode={setMode}
        setCharacteristics={setCharacteristics}
        setTendencies={setTendencies}
        mousePosition={mousePosition}
        windowSize={windowSize}
        audio={vineboom}
      />
      <MouseFollower
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        mousePosition={mousePosition}
        windowSize={windowSize}
      />
      <Gatito
        mode={mode}
        characteristics={characteristics}
        tendencies={tendencies}
        />
    </div>
  );
}

export default App;
