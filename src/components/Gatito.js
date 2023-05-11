import React from 'react';
import getClassName from '../utils/getClassName';

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

export default Gatito;
