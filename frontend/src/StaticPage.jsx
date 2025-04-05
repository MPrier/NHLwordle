import { useContext, useEffect, useState } from 'react';
import "./components/Header.css";
import "./css/page.css";
import image from './img/image.png';
import "./css/App.css";
import "./css/index.css";
import { UserContext } from './context/context';


function TitleBar() {
    return (
        <div id='header-bar'>
            <button> ? </button>
            <h1>Puckle</h1>
            <button>&#127918;</button>
        </div>
    )
}

function PlayerSection({ image, text, name }) {
    return (
        <div>
            {/* <img src={image} alt={text} /> */}
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

function InputBar({ userInputAndFeedback, setUserInputAndFeedback, inputValue, setInputValue }) {
    let context = useContext(UserContext);
    let playerInfo = context.playerInfo;
    
    return (
        <>
            <input type="text" autoFocus placeholder='Enter Career Points' value={inputValue} onInput={(e) => handleChange(e,setInputValue)} onKeyDown={(e) => handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, playerInfo.careerPoints, setInputValue)} />
        </>
    )
}

function handleArrowFeedbackEmoji(arrowFeedback) {
    switch(arrowFeedback) {
        case 'up':
            return <div>&#11014;</div>
        case 'down':
            return <div>&#11015;</div>
        case 'correct':
            return <div>&#9989;</div>

    }
}
function InputTable({isAnimationTriggered, inputValue, setInputValue}) {
    const {userInputAndFeedback, setUserInputAndFeedback, playerInfo} = useContext(UserContext);
    return (
        <>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow key={index} index={index} guess={pastGuess.guessNumber} colorFeedback={pastGuess.colorFeedback} arrowDirection={handleArrowFeedbackEmoji(pastGuess.ArrowFeedback)} />
                })}
            </ul>
            {!isAnimationTriggered && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} inputValue={inputValue} setInputValue={setInputValue}/>}
        </>
    )
}

function handleChange(e, setInputValue) {
    // Remove non-numeric characters
    const sanitized = e.target.value.replace(/\D/g, '');

  // Limit to 6 characters
    const trimmed = sanitized.slice(0, 6);

    if (Number(trimmed) === 0) {
        setInputValue('')
        return 
    }
    setInputValue(trimmed);
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, careerPoints, setInputValue) {
    if (e.key === 'Enter') {
        const num = Number(e.target.value)

        if (!isNaN(num) && num > 0 && num < 1000000) {
            const feedback = feedbackHandler(careerPoints, e.target.value);
            localStorage.setItem("UserInputAndFeedback",JSON.stringify([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback.color, ArrowFeedback: feedback.arrowFeedback }]))
            setUserInputAndFeedback([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback.color, ArrowFeedback: feedback.arrowFeedback }])
            setInputValue('')
        }
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
    const arrowFeedback = color === "green" ? "correct" : careerPoints > userGuess ? "up" : "down";

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
    const [inputValue, setInputValue] = useState('');
    
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
            <InputTable isAnimationTriggered={isAnimationTriggered} inputValue={inputValue} setInputValue={setInputValue} />
        </div>
    )
}

export default StaticApp