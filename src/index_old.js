import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import reportWebVitals from './reportWebVitals';
import useSound from 'use-sound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Universal function for getting classnames; hack but who cares

const getClassName = (elementName, mode, characteristics, tendencies) => {
  let className = elementName + " " + elementName + "-" + mode;
  if (characteristics) {
    className += " " + elementName + "-characteristics";
  }
  if (tendencies) {
    className += " " + elementName + "-tendencies";
  }
  return className;
}

// Custom hook for getting mouse position

const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: null, y: null });

  React.useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const useWindowSize = () => {
  const [
    windowSize,
    setWindowSize
  ] = React.useState({ width: window.innerWidth, height: window.innerHeight });

  React.useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return windowSize;
};

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const setUrl = url => {
    audio.src = url;
  };

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, setPlaying, setUrl];
};

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

function ClipboardCopy({ copyText }) {
  // stole this from some guy
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <input id="server-url" type="text" value={copyText} readOnly />
      <button id="server-copy-button" onClick={handleCopyClick}>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  );
}

function BGElem({mode, characteristics, tendencies, mousePosition, windowSize}) {
  // This is a background element that shifts with the mouse position
  return (
    <div
      className={getClassName("BGElem", mode, characteristics, tendencies)}
      style= {{
        transform: tendencies ? 
          "scale(2.0) perspective(1000px) rotateX(" + ((-1 * mousePosition.y) + (windowSize.height / 2)) / 25 + "deg) rotateY(" + ((mousePosition.x) - (windowSize.width / 2)) / 25 + "deg)"
          : "scale(2.0)",
      }}
    />
  );
}


function BGOverlay({mode, characteristics, tendencies, mousePosition, windowSize, bottomness}) {
  return(
    <div
      className={bottomness ? getClassName("BGOverlay", mode, characteristics, tendencies) + " BGOverlay-top" : getClassName("BGOverlay", mode, characteristics, tendencies) + " BGOverlay-bottom"}
    />
  );
}

// create a react element that changes text on click once
function PrankButton({characteristics, audio}) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked && characteristics) {
      audio.play();
    }
  }, [clicked]);

  return (
    <span
      className="main-button-style"
      onClick={() => setClicked(true)}
      style={{
        lineHeight: clicked ? "3em" : "1em",
      }}
    >
      {clicked ? 
        <div>Get pranked</div>
        : <div>Buy ranks! <br /><small>Pay with Ethereum, Dogecoin, Gruncible, Quelchtube</small></div>}
    </span>
  );
}

function SettingsPane({mode, characteristics, tendencies, setMode, setCharacteristics, setTendencies, audio}) {

  // handlers for the settings pane
  // handeModeChange takes mode, increments by 1, and takes the mod 3
  const handleModeChange = (event) => {
    setMode((mode + 1) % 3);
    if (characteristics) {
      audio.play();
    }
  }

  const handleCharacteristicsChange = (event) => {
    setCharacteristics(!characteristics);
    if (characteristics) {
      audio.play();
    }
  }
  const handleTendenciesChange = (event) => {
    setTendencies(!tendencies);
    if (characteristics) {
      audio.play();
    }
  }
  return (
    <ul className={getClassName("SettingsPane", mode, characteristics, tendencies)}>
      <h3 id="settings-title">Settings</h3> 
      <li>
        Mode: <button value={0} onClick={handleModeChange} className={"settings-button " + getClassName("mode")}>
        {mode === 0 ? "Swiss Bingus" : 
        mode === 1 ? "Swag Floppa" :
        mode === 2 ? "Maoist Sploingus" : "Error"}
      </button>
      </li>
      <li>
        Characteristics: <button value={0} onClick={handleCharacteristicsChange} className={"settings-button " + getClassName("characteristics")}>
        {characteristics ? "On" : "Off"}
      </button>
      </li>
      <li>
        Tendencies: <button value={0} onClick={handleTendenciesChange} className={"settings-button " + getClassName("tendencies")}>
        {tendencies ? "On" : "Off"}
      </button>
      </li>
    </ul>        
  )
}

function MouseFollower({mode, characteristics, tendencies, mousePosition, windowSize}) {
  return (
    mode === 2 && tendencies ?
    <img
      className={getClassName("MouseFollower", mode, characteristics, tendencies)}
      src="/img/talisman.png"
      style= {{
        transform: "translate(" + (50 + mousePosition.x - (windowSize.width / 2)) + "px, " + (80 + mousePosition.y - (windowSize.height / 2)) + "px)",
      }}
    /> : <TextMouseSpooler
        frequentSaying="Swiss!"
        lessFrequentSaying="Swag!"
        mousePosition={mousePosition}
      />
  );
}

function TextMouseSpooler({frequentSaying, lessFrequentSaying, mousePosition}) {
  // every time the mouse moves a certain amount, increment the counter
  // if the counter is greater than a certain amount, change the text
  // if the counter is greater than a certain amount, reset the counter
  const [mousePositionSinceLastSignificantMove, setMousePositionSinceLastSignificantMove] = useState({x: 0, y: 0});

  // create an empty array
  const [textObjectArray, setTextObjectArray] = useState([]);

  // use pythagorean theorem to determine the distance between current mouse point and last significant mouse point. if the distance is greater than 20, increment the counter

  useEffect(() => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - mousePositionSinceLastSignificantMove.x, 2) + Math.pow(mousePosition.y - mousePositionSinceLastSignificantMove.y, 2));
    if (distance > 20) {
      // push a new text object to the array, with the last significant mouse position and either the frequent or less frequent saying depending on random value
      setTextObjectArray(textObjectArray.concat({
        position: mousePositionSinceLastSignificantMove,
        saying: Math.random() > 0.5 ? frequentSaying : lessFrequentSaying,
        timeAtCreation: Date.now(),
      }));
      setMousePositionSinceLastSignificantMove(mousePosition);
      // remove all elements from the array older than 5 seconds. don't use filter for this, use a for loop
      // only run this for loop if time is divisible by 1000 (once per second)
      if (Date.now() % 1000 === 0) {
        for (let i = 0; i < textObjectArray.length; i++) {
          if (Date.now() - textObjectArray[i].timeAtCreation > 5000) {
            textObjectArray.splice(i, 1);
          }
        }
      }
    }
  }, [mousePosition]);
  
  // return a counter
  return (
    <div className="TextMouseSpooler">
      {/*map the array to spans, give their x and y position as the one stored in the array*/}
      {textObjectArray.map((textObject, index) => {
        return (
          <span
            key={index}
            className="text-mouse-spooler-span"
            style={{
              top: textObject.position.y,
              left: textObject.position.x,
            }}
          >
            {textObject.saying}
          </span>
        );
      })}
    </div>
  );
}

function MainDiv({mode, characteristics, tendencies, setMode, setCharacteristics, setTendencies, mousePosition, windowSize, audio}) {
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
        <ClipboardCopy copyText={"mc.7800.io"}/>
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

function Gatito({ mode, tendencies }) {
  return (
    <img className={getClassName("Gatito", mode, false, tendencies)} src={
        mode === 0 ? "/img/bingus.png" :
        mode === 1 ? "/img/dripfloppa.png" :
        mode === 2 ? "/img/sploingus.png" :
        "/img/bingus.png"
      }/>
  );
}

export default App;



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();