import { useState, useRef, useEffect } from "react";
import "./App.css";
import quotes from "./data/phrases.json";
import getRandomNumber from "./utils/getRandomNumber";
import Phrase from "./components/Phrase";
import BtnPhrase from "./components/BtnPhrase";
import photos from "./data/photos.json";

function App() {
  const indexRandom = getRandomNumber(quotes.length);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const [phraseSelected, setPhraseSelected] = useState(quotes[indexRandom]);
  const [bgSelected, SetBfSelected] = useState(
    photos[getRandomNumber(photos.length)]
  );
  const [videoVisible, setVideoVisible] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current.currentTime >= 18.67) {
        setVideoVisible(false);
        setContentVisible(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const objStyle = {
    backgroundImage: `url(/img/fondo${bgSelected}.jpg)`,
  };

  const handleVideoLoadedMetadata = () => {
    videoRef.current.currentTime = 14.7;
  };

  const handlePlayButtonClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  const handleVideoPlay = () => {
    setButtonVisible(false);
    setContentVisible(false);
  };

  return (
    <div className="container" style={objStyle}>
      <h1 className="title">Galletas de la Fortuna</h1>

      <div>
        {videoVisible && (
          <video
            ref={videoRef}
            className="video"
            autoPlay
            controls={false}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onPlay={handleVideoPlay}
            src="/FC.mp4"
            type="video/mp4"
          />
        )}
        {buttonVisible && (
          <button
            className="ask-btn"
            ref={buttonRef}
            onClick={handlePlayButtonClick}
          >
            Rompe la galleta
          </button>
        )}
      </div>

      {contentVisible && (
        <>
          <BtnPhrase
            setPhraseSelected={setPhraseSelected}
            SetBfSelected={SetBfSelected}
          />
          <div className="phrase">
            <Phrase phraseSelected={phraseSelected} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
