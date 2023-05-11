import React, { useState } from 'react';
import getClassName from '../utils/getClassName';

function ClipboardCopy({ copyText, tendencies, characteristics, audio, mousePosition }) {
    // stole this from some guy
    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
      if (characteristics) {
        audio.play();
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
      <div className={getClassName('ClipboardCopy')}>
        <input id="server-url" type="text" value={copyText} readOnly />
        <button className='server-copy-button' onClick={handleCopyClick}>
          <span>Copy</span>
          {isCopied && tendencies ? 
          <span className='text-mouse-spooler-span'
          >Copied!</span> : null}
        </button>
      </div>
    );
  }

export default ClipboardCopy;

