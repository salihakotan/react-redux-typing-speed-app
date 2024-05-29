import React, { useState } from "react";

function TypeInput() {


  const [inputValue, setInputValue] = useState("");
  let [timesUp, setTimesUp] = useState(false);
  let [time,setTime] = useState(5)

  var intervalId;


  const handleChange = (e) => {
        setInputValue(e);
        intervalId = setInterval(countdown,1000)
  
  };


  const countdown = () => {
    if(!intervalId) return

    time--;
    setTime(time)

    if(time<= 0) {
        setTime("times up")
        clearInterval(intervalId)
        setTimesUp(true)
       
    }
  }


  const restartBtn = () => {
        setTime(5)
        setTimesUp(false)
        setInputValue("")
  }



  return (
    <div className="typeInputArea">
      <input disabled={timesUp}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      ></input>
      <div className="timeBox">{time}</div>
      <button disabled={!timesUp} className="btn" onClick={restartBtn}>Restart</button>
    </div>
  );
}

export default TypeInput;
