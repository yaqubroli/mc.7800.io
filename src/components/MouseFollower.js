import React from 'react';
import TextMouseSpooler from './TextMouseSpooler';
import getClassName from '../utils/getClassName';

function MouseFollower({ mode, characteristics, tendencies, mousePosition, windowSize }) {
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

export default MouseFollower;
