import React from 'react';
import getClassName from '../utils/getClassName';

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

export default SettingsPane;