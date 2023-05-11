import React from 'react';
import getClassName from '../utils/getClassName';

function BGOverlay({ mode, characteristics, tendencies, mousePosition, windowSize, bottomness }) {
  return(
    <div
      className={bottomness ? getClassName("BGOverlay", mode, characteristics, tendencies) + " BGOverlay-top" : getClassName("BGOverlay", mode, characteristics, tendencies) + " BGOverlay-bottom"}
    />
  );
}

export default BGOverlay;
