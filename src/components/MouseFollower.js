import React from 'react';
import TextMouseSpooler from './TextMouseSpooler';
import getClassName from '../utils/getClassName';

function MouseFollower({ mode, characteristics, tendencies, mousePosition, windowSize }) {
  return (
    mode === 2 ?
    <img
      className={getClassName("MouseFollower", mode, characteristics, tendencies)}
      src="/img/talisman.png"
      style= {{
        transform: "translate(" + (50 + mousePosition.x - (windowSize.width / 2)) + "px, " + (80 + mousePosition.y - (windowSize.height / 2)) + "px)",
      }}
    /> : mode == 0 ? <TextMouseSpooler
        frequentSaying="Swiss!"
        lessFrequentSaying="Swag!"
        mousePosition={mousePosition}
    /> : mode == 1 ? <TextMouseSpooler
        frequentSaying="Bussin!"
        lessFrequentSaying="Grindset!"
        mousePosition={mousePosition}
    /> : null
  );
}

export default MouseFollower;
