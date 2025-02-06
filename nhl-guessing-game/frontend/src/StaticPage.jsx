import { useContext, useEffect, useState } from 'react';
import "./components/Header.css";
import "./page.css";
import image from './img/image.png';
import { UserContext } from './context/context';

function TitleBar() {
    return (
        <div id='header-bar'>
            <button> ? </button>
            <h1>Puckle</h1>
            <button>? </button>
        </div>
    )
}

function PlayerSection({ image, text, name }) {
    return (
        <div>
            <img src={image} alt={text} />
            <h2>{name}</h2>
        </div>
    )
}

function AttemptsAndPoints({ userInputAndFeedback }) {
    const count = 5 - userInputAndFeedback.length;
    return (
        <>
            <h3>{count}/5 attempts remaining</h3>
        </>
    )
}

// TODO get picture for arrow direction. fix styling  
function InputRow({ guess, colorFeedback, arrowDirection, index }) {
    return (
        <>
            <li className='row' key={index}>
                <div className='rectangle1'>{guess}</div>
                <div className={`rectangle2 rectangle2-${colorFeedback}`}>{arrowDirection}</div>
            </li>
        </>
    )
}

function InputBar({ userInputAndFeedback, setUserInputAndFeedback }) {
    let context = useContext(UserContext);
    let playerInfo = context.playerInfo;
    
    return (
        <>
            <input type="number" placeholder='Enter Career Points' autoFocus onKeyDown={(e) => handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, playerInfo.careerPoints)} />
        </>
    )
}

function InputTable({ userInputAndFeedback, setUserInputAndFeedback, isAnimationTriggered }) {
    return (
        <>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow key={index} index={index} guess={pastGuess.guessNumber} colorFeedback={pastGuess.colorFeedback} arrowDirection={pastGuess.ArrowFeedback} />
                })}
            </ul>
            {!isAnimationTriggered && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} />}
        </>
    )
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, careerPoints) {
    if (e.key === 'Enter' && e.target.value) {
        const feedback = feedbackHandler(careerPoints, e.target.value);
        localStorage.setItem("UserInputAndFeedback",JSON.stringify([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback.color, ArrowFeedback: feedback.arrowFeedback }]))
        setUserInputAndFeedback([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback.color, ArrowFeedback: feedback.arrowFeedback }])
        e.target.value = '';
    }
}

function colorFeedback(percentageDifference) {
    if (percentageDifference <= 5) {
        return "green";
    }
    else if (percentageDifference <= 25) {
        return "yellow";
    }
    else {
        return "red";
    }
}

function feedbackHandler(careerPoints, userGuess) {
    careerPoints = Number(careerPoints);
    userGuess = Number(userGuess);
    const difference = Math.abs(careerPoints - userGuess);
    const average = (careerPoints + userGuess) / 2;
    const percentageDifference = (difference / average) * 100;

    let color = colorFeedback(percentageDifference);

    const arrowFeedback = color === "green"
        ? "correct"
        : careerPoints > userGuess ? "up" : "down";

    return {color, arrowFeedback};

}

function checkGameState(userInputAndFeedback, setGameOverAnimationText, setIsAnimationTriggered) {
    if (userInputAndFeedback.some((feedback) => feedback.colorFeedback === "green")) {
        
        setGameOverAnimationText("You Win! :)");
        setIsAnimationTriggered(true);
    }
    else if (userInputAndFeedback.length === 5) {
        setGameOverAnimationText('You Lose :(')
        setIsAnimationTriggered(true);
    }
}

function StaticApp() {
    const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
    const [gameOverAnimationText, setGameOverAnimationText] = useState('');
    const {userInputAndFeedback, setUserInputAndFeedback, playerInfo} = useContext(UserContext);
    
    useEffect(() => {
        checkGameState(userInputAndFeedback, setGameOverAnimationText, setIsAnimationTriggered);
    }, [userInputAndFeedback]);

    return (
        <div id="page">
            <TitleBar />
            <PlayerSection image={playerInfo.image} text="Example" name={playerInfo.name} />
            <AttemptsAndPoints userInputAndFeedback={userInputAndFeedback} />
            {isAnimationTriggered &&
                <div className='animation'>
                    <div >{gameOverAnimationText}</div>
                    <div>{playerInfo.name} has {playerInfo.careerPoints} career points</div>
                </div>
            }
            <InputTable userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} isAnimationTriggered={isAnimationTriggered} />
        </div>
    )
}

export default StaticApp