import React, { useState, useEffect } from "react";
import getRandomNumber from "../utils/getRandomNumber";
import quotes from "../data/phrases.json";

const Phrase = () => {
  const [showFirstImage, setShowFirstImage] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
  const [phraseSelected, setPhraseSelected] = useState({});

  const handleClick = () => {
    const audio = new Audio("public/short-egg-cracking.mp3");
    audio.play();

    setShowFirstImage(true);
    setTimeout(() => {
      setShowSecondImage(true);
      setTimeout(() => {
        setShowPhrase(true);
      }, 1000);
    }, 1000);

    // Cambiar la frase seleccionada
    const indexRandom = getRandomNumber(quotes.length);
    setPhraseSelected(quotes[indexRandom]);
  };

  useEffect(() => {
    let timer;
    if (showPhrase) {
      timer = setTimeout(() => {
        setShowFirstImage(false);
        setShowSecondImage(false);
        setShowPhrase(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showPhrase]);

  return (
    <div>
      {showPhrase ? (
        <p className="textphrase">
          <span>{phraseSelected.phrase}</span> <br />
          <span className="autor"> {phraseSelected.author}</span>
        </p>
      ) : showSecondImage ? (
        <img
          src="public/img/Roto.png"
          alt="Segunda Imagen"
          style={{ width: "200px", height: "200px" }}
          onClick={handleClick}
        />
      ) : showFirstImage ? (
        <img
          src="public/img/abrir.png"
          alt="Primera Imagen"
          style={{ width: "200px", height: "200px" }}
          onClick={handleClick}
        />
      ) : (
        <div>
          <img
            src="public/img/image-removebg-preview.png"
            alt="Imagen"
            style={{ width: "200px", height: "200px" }}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default Phrase;
