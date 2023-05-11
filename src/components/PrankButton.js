import React, {useState, useEffect} from 'react';

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

export default PrankButton;