import React from "react";
import { useSelector } from "react-redux";
import {
  correctWordsSelector,
  keyPressSelector,
  timeSelector,
  wrongCharsSelector,
  wrongWordsSelector,
} from "../redux/wordsSlice";
import { handleReplay } from "../utils/actions";
import { MdReplay } from "react-icons/md";
import { GiSpockHand } from "react-icons/gi";

function Result() {
  const time = useSelector((state) => timeSelector(state));
  const correctWords = useSelector((state) => correctWordsSelector(state));
  const wrongWords = useSelector((state) => wrongWordsSelector(state));
  const keyPress = useSelector((state) => keyPressSelector(state));
  const wrongChars = useSelector((state) => wrongCharsSelector(state));
  const display = time < 1 ? { display: "flex" } : { display: "none" };

  const handleClick = () => {
    handleReplay();
  };

  return (
    <div style={display} className="results">
      <div className="stats">
        <div className="stats__title">
          Your Fingers Result <GiSpockHand />
        </div>
        <div className="stats__wpm">
          {correctWords.length} WPM <span>(Word Per Minute)</span>
        </div>
        <div className="stats__inner">
          <div className="spec keyStroke">
            Key Stroke:
            <span
              className="value"
              correct={keyPress - wrongChars}
              wrong={wrongChars}
            >
              {keyPress}
            </span>
          </div>
          <div className="spec">
            Accuracy:{" "}
            <span className="value">
              {parseInt(
                (correctWords.length /
                  (wrongWords.length + correctWords.length)) *
                  100
              )}
              %
            </span>
          </div>
          <div className="spec">
            Correct Words: <span className="value">
                {correctWords.length}
            </span>
          </div>
          <div className="spec">
            Wrong Words: <span className="value">
                {wrongWords.length}
            </span>
          </div>
        </div>
        <button className="stats__replay"
        onClick={handleClick}
        >
            <MdReplay/>
        </button>
      </div>
    </div>
  );
}

export default Result;
