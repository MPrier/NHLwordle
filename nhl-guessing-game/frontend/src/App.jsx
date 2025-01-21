import { useEffect, useState } from 'react'
import { getPlayerData } from './api_calls/api';
import './App.css'
import Modal from './popup'
import PlayerPage from './PlayerComps';
import { useActionState } from 'react';


function App() {
  const [count, setCount] = useState(5);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [player, setPlayer] = useState('');
  const [playername, setPlayerName] = useState('');
  const [bestGuess, setBestGuess] = useState(0);
  const [gamePlayersArray, setGamePlayersArray] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // why is the function inside the useEffect
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
          const data = await getPlayerData(); // Fetch player object
          setGamePlayersArray(data);
          console.log(data[0]);
          setPlayer(data[0]); // Set the entire object in state
          setPlayerName(data[0].name);
      } catch (error) {
          console.error('Error fetching player data:', error);
      }
  };

  fetchPlayerData();
  }, [])

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && guess != "") {
      handleSubmit();
    }
  }
  
  const roundDownPointsToNearestHundred = (num) => {  
    return Math.floor(num / 100) * 100;
  }

  const points_algo = (guess) => {
    const diff = Math.abs(guess - player.career_points);
    const points = 1000 - diff;
    
    if (points > bestGuess) {
      setBestGuess(points);
    }
  }

  const handleSubmit = () => {
    const remainingGuesses = count - 1;

    if (remainingGuesses == 0) {
      setShowNextButton(true);
    }

    // Early exit if no guesses left or already correct
    if (count <= 0 || feedback === "Correct!") {
      setShowNextButton(true);
      return;
    }
    
    setCount(remainingGuesses);
    const numGuess = parseInt(guess, 10);
    points_algo(numGuess);

    // make this if statement a function
    let feedbackMessage = "";
    if (numGuess === player.career_points) {
      feedbackMessage = "Correct!";
      console.log("player count: " + playerCount);

      if (playerCount + 1 >= 3) {
        setIsModalOpen(true);
      }
      else {
        setShowNextButton(true);
      }
    } else {
      feedbackMessage = numGuess > player.career_points ? "Go Lower!" : "Go Higher!"; 
    }

    setPastGuesses([...pastGuesses, {guess: guess, feedback: feedbackMessage}]);
    setFeedback(feedbackMessage);
    setGuess("");
  
    // setShowNextButton(true);
  }

  const handleNextPlayer = () => {
    if (playerCount + 1 >= 3) {
      
      setIsModalOpen(true);
      return; // game over
    }
      setPlayer(gamePlayersArray[playerCount + 1]);
      setPlayerName(gamePlayersArray[playerCount + 1].name);
      setPlayerCount(playerCount+1);
      setTotalPoints(totalPoints + bestGuess);
      setBestGuess(0);
      setFeedback("");
      setPastGuesses([]);
      setCount(5);
      setGuess("");
      setShowNextButton(false);
  }

  const closeModal = () => {
    handleNextPlayer();
    setIsModalOpen(false);
  };
  
  return (
    <div>
      
      <PlayerPage
        pastGuesses={pastGuesses}
        player={playername}
        count={count}
        bestGuess={bestGuess}
      />

      {!showNextButton && <input 
        type="number"
        value={guess} 
        onChange={(e) => setGuess(e.target.value)} 
        placeholder='Enter Career Points'
        autoFocus
        onKeyDown={handleEnterKey} 
      />}
      {/* <button onClick={handleSubmit}>Submit Guess</button> */}
      {showNextButton && <button onClick={handleNextPlayer}>Next</button>}
      {showNextButton && <h3>Total Points: {totalPoints + bestGuess }</h3>}

      <Modal
        isOpen={isModalOpen}
        playerName={player.name}
        careerPoints={player.career_points}
        playerScore={bestGuess}
        totalPoints={totalPoints}
        onClose={closeModal}
      />

    </div>
  )
}

export default App
