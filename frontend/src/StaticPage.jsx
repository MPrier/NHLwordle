import { useContext, useEffect, useState } from 'react';
import "./components/Header.css";
import "./css/page.css";
import image from './img/image.png';
import "./css/App.css";
import "./css/index.css";
import { UserContext } from './context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function TitleBar() {
    return (
        <div id='header-bar'>
            <button> ? </button>
            <h1>Puckle</h1>
            <button><FontAwesomeIcon icon={faRankingStar} style={{color: "#ffffff",}} size='1x'/></button>
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
                <div className='arrow'>{arrowDirection}</div>
                {/* <div className={`rectangle2 rectangle2-${colorFeedback}`}>{arrowDirection}</div> */}
                {/* <div><FontAwesomeIcon icon={faArrowUp} style={{color: "#FFD43B",}} size='2x'/></div> */}
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

function handleArrowFeedbackEmoji(arrowFeedback, colorFeedback) {
    switch(arrowFeedback) {
        case 'up':
            if (colorFeedback == 'yellow') {
                return <div><FontAwesomeIcon icon={faArrowUp} style={{color: "#FFD43B",}} size='3x'/></div>
            }
            else {
                return <div><FontAwesomeIcon icon={faArrowUp} style={{color: "#ce1c1c",}} size='3x' /></div>
            }
            
        case 'down':
            if (colorFeedback == 'yellow') {
                return <div><FontAwesomeIcon icon={faArrowDown} style={{color: "#FFD43B",}} size='3x'/></div>
            }
            else {
                return <div><FontAwesomeIcon icon={faArrowDown} style={{color: "#ce1c1c",}} size='3x' /></div>
            }

        case 'correct':
            return <div><FontAwesomeIcon icon={faCheck} style={{color: "#1e8f0f",}} size='3x'/></div>

    }
}
function InputTable({isAnimationTriggered, inputValue, setInputValue}) {
    const {userInputAndFeedback, setUserInputAndFeedback, playerInfo, isInitialized} = useContext(UserContext);
    console.log(isInitialized);
    // if (!isInitialized) return 'balls';

    const emptyRows = [];
    const maxRows = 5;
    for (let i = userInputAndFeedback.length; i < maxRows; i++) {
        emptyRows.push(<InputRow key={`empty-${i}`} index={i} guess={""} colorFeedback={[]} arrowDirection={[]} />);
    }
    return (
        <>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow key={index} index={index} guess={pastGuess.guessNumber} colorFeedback={pastGuess.colorFeedback} arrowDirection={handleArrowFeedbackEmoji(pastGuess.ArrowFeedback, pastGuess.colorFeedback)} />
                })}
                {!isAnimationTriggered && emptyRows}
            </ul>
            {/* {!isAnimationTriggered && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} inputValue={inputValue} setInputValue={setInputValue}/>} */}
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
    const {userInputAndFeedback, setUserInputAndFeedback, playerInfo, isInitialized} = useContext(UserContext);
    const [inputValue, setInputValue] = useState('');
    const [ready, setReady] = useState(false)
    
    useEffect(() => {
        checkGameState(userInputAndFeedback, setGameOverAnimationText, setIsAnimationTriggered);
        setReady(true)
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
            {isInitialized && ready && <InputTable isAnimationTriggered={isAnimationTriggered} inputValue={inputValue} setInputValue={setInputValue} />}
            {!isAnimationTriggered && isInitialized && ready && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} inputValue={inputValue} setInputValue={setInputValue}/>}
        </div>
    )
}

export default StaticApp