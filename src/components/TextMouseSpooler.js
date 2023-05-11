import React, {useState, useEffect} from 'react';
import getClassName from '../utils/getClassName';

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

  export default TextMouseSpooler;