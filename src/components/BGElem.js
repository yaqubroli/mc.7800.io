import React from 'react';
import getClassName from '../utils/getClassName';

function BGElem({ mode, characteristics, tendencies, mousePosition, windowSize }) {
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

export default BGElem;
