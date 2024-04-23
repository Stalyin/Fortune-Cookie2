import React, { useState, useRef, useEffect } from "react";
import getRandomNumber from "../utils/getRandomNumber";
import quotes from "../data/phrases.json";
import photos from "../data/photos.json";

const BtnPhrase = ({ setPhraseSelected, SetBfSelected }) => {
  const [buttonText, setButtonText] = useState("Toca la Galleta");
  const buttonRef = useRef(null);

  const changePhrase = () => {
    const indexRandom = getRandomNumber(quotes.length);
    setPhraseSelected(quotes[indexRandom]);
    SetBfSelected(photos[getRandomNumber(photos.length)]);
    setButtonText("Toca otra vez");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !(
          event.clientX >= buttonRef.current.offsetLeft - 20 &&
          event.clientX <=
            buttonRef.current.offsetLeft + buttonRef.current.offsetWidth + 20 &&
          event.clientY >= buttonRef.current.offsetTop - 20 &&
          event.clientY <=
            buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 20
        )
      ) {
        changePhrase();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef]);

  return (
    <button ref={buttonRef} className="button1">
      {buttonText}
    </button>
  );
};

export default BtnPhrase;
