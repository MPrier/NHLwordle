import { useEffect, useState } from "react";
import "./css/page.css";
import "./css/App.css";
import "./css/index.css";
import { challenges } from "./data/data";
import { setPlayerInfo, getPlayerInfo } from "./data/playerStore";

import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";

function TitleBar() {
  return (
    <div id="header-bar">
      <button> ? </button>
      <h1>Puckle</h1>
      <button>
        <MdLeaderboard size={"15px"} />
      </button>
    </div>
  );
}

function PlayerSection({ image, name }) {
  return (
    <div className="hockey-card">
      <img src={image} alt={name} className="player-image" />
      <div className="nameplate">{name}</div>
    </div>
  );
}

function handleArrowFeedbackEmoji(arrowFeedback, colorFeedback) {
  switch (arrowFeedback) {
    case "up":
      return (
        <FaArrowUp
          color={colorFeedback === "yellow" ? "#FFD43B" : "#ce1c1c"}
          size="50px"
        />
      );
    case "down":
      return (
        <FaArrowDown
          color={colorFeedback === "yellow" ? "#FFD43B" : "#ce1c1c"}
          size="50px"
        />
      );
    case "correct":
      return <IoIosCheckmark color="#1e8f0f" size="100px" />;
    default:
      return null;
  }
}

function InputBar({ userInputAndFeedback, setUserInputAndFeedback, inputValue, setInputValue }) {
  const playerInfo = getPlayerInfo();

  return (
    <input
      type="text"
      autoFocus
      placeholder="Enter Career Points:"
      value={inputValue}
      onInput={(e) => handleChange(e, setInputValue)}
      onKeyDown={(e) =>
        handleKeyDown(
          e,
          setUserInputAndFeedback,
          userInputAndFeedback,
          playerInfo.careerPoints,
          setInputValue
        )
      }
    />
  );
}

function InputTable({ isAnimationTriggered, userInputAndFeedback }) {
  const emptyRows = [];
  const maxRows = 5;

  for (let i = userInputAndFeedback.length; i < maxRows; i++) {
    emptyRows.push(
      <div className="input-row stat-row empty" key={`empty-${i}`}>
        <div className="stat-cell">{i + 1}</div>
        <div className="stat-cell">—</div>
        <div className="stat-cell">—</div>
      </div>
    );
  }

  return (
    <div className="input-table">
      <div className="stat-header">
        <div className="stat-cell">Guess #</div>
        <div className="stat-cell">Guess</div>
        <div className="stat-cell">Accuracy</div>
      </div>
      {userInputAndFeedback.map((pastGuess, index) => {
        const isLast = index === userInputAndFeedback.length - 1;
        return (
          <div
            className={`input-row stat-row ${isLast ? "flip-in" : ""}`}
            key={index}
          >
            <div className="stat-cell">{index + 1}</div>
            <div className="stat-cell">{pastGuess.guessNumber}</div>
            <div className="stat-cell">
              {handleArrowFeedbackEmoji(
                pastGuess.ArrowFeedback,
                pastGuess.colorFeedback
              )}
            </div>
          </div>
        );
      })}
      {!isAnimationTriggered && emptyRows}
    </div>
  );
}

function handleChange(e, setInputValue) {
  const sanitized = e.target.value.replace(/\D/g, "").slice(0, 6);
  setInputValue(Number(sanitized) === 0 ? "" : sanitized);
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, careerPoints, setInputValue) {
  if (e.key === "Enter") {
    const num = Number(e.target.value);
    if (!isNaN(num) && num > 0 && num < 1000000) {
      const feedback = feedbackHandler(careerPoints, num);
      const updated = [
        ...userInputAndFeedback,
        {
          guessNumber: num,
          colorFeedback: feedback.color,
          ArrowFeedback: feedback.arrowFeedback,
        },
      ];
      localStorage.setItem("UserInputAndFeedback", JSON.stringify(updated));
      setUserInputAndFeedback(updated);
      setInputValue("");
    }
  }
}

function colorFeedback(percentageDifference) {
  if (percentageDifference <= 5) return "green";
  if (percentageDifference <= 15) return "yellow";
  return "red";
}

function feedbackHandler(careerPoints, userGuess) {
  const difference = Math.abs(careerPoints - userGuess);
  const average = (careerPoints + userGuess) / 2;
  const percentageDifference = (difference / average) * 100;

  const color = colorFeedback(percentageDifference);
  const arrowFeedback = color === "green" ? "correct" : careerPoints > userGuess ? "up" : "down";

  return { color, arrowFeedback };
}

function checkGameState(userInputAndFeedback, setGameOverAnimationText, setIsAnimationTriggered) {
  if (userInputAndFeedback.some((f) => f.colorFeedback === "green")) {
    setGameOverAnimationText("You Win! :)");
    setIsAnimationTriggered(true);
  } else if (userInputAndFeedback.length === 5) {
    setGameOverAnimationText("You Lose :(");
    setIsAnimationTriggered(true);
  }
}

function getTodayPlayer(today) {
  return challenges.find((p) => p.date === today) || challenges[Math.floor(Math.random() * challenges.length)];
}

function storeUserStats(result, ) {

}

const safeParse = (value, fallback = []) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

export default function StaticApp() {
  const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
  const [gameOverAnimationText, setGameOverAnimationText] = useState("");
  const [userInputAndFeedback, setUserInputAndFeedback] = useState([]);
  const [playerInfo, setPlayerInfoState] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const newPlayer = getTodayPlayer(today);

    const storedDate = localStorage.getItem("UserInputDate");
    const storedFeedback = safeParse(localStorage.getItem("UserInputAndFeedback"));

    if (today !== storedDate) {
      localStorage.setItem("UserInputDate", today);
      localStorage.setItem("UserInputAndFeedback", JSON.stringify([]));
      localStorage.setItem("PlayerInfo", JSON.stringify(newPlayer));

      setUserInputAndFeedback([]);
    } else {
      setUserInputAndFeedback(storedFeedback);
    } 
    
    setPlayerInfo(newPlayer);
    setPlayerInfoState(newPlayer);
  }, []);

  useEffect(() => {
    checkGameState(userInputAndFeedback, setGameOverAnimationText, setIsAnimationTriggered);
    setReady(true);
  }, [userInputAndFeedback]);

  if (!playerInfo) return null;

  return (
    <div id="page">
      <TitleBar />
      <PlayerSection image={playerInfo.image} name={playerInfo.name} />
      {ready && (
        <>
          <InputTable
            isAnimationTriggered={isAnimationTriggered}
            userInputAndFeedback={userInputAndFeedback}
          />
          {!isAnimationTriggered && (
            <InputBar
              userInputAndFeedback={userInputAndFeedback}
              setUserInputAndFeedback={setUserInputAndFeedback}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
          {isAnimationTriggered && (
            <div className="animation">
              <div>{gameOverAnimationText}</div>
              <div>
                {playerInfo.name} has {playerInfo.careerPoints} career points
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
