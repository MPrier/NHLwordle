import { useEffect, useState } from 'react';
import "./components/Header.css";
import "./page.css";
import image from './img/image.png';

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

function AttemptsAndPoints({ attempts, points, userInputAndFeedback }) {
    const count = 5 - userInputAndFeedback.length;
    return (
        <>
            <h3>{count}/5 attempts remaining</h3>
            {/* <h3>Points: {points}</h3> */}
        </>
    )
}

// TODO add color feedback to the style of rectange 2. get picture for arrow direction. fix styling so it doesn't 
function InputRow({ guess, colorFeedback, arrowDirection, index }) {

    console.log(index);
    return (
        <>
            <li className='row' key={index}>
                <div className='rectangle1'>{guess}</div>
                <div className='rectangle2'>{arrowDirection}</div>
            </li>
        </>
    )
}

function InputBar({userInputAndFeedback, setUserInputAndFeedback}) {
    console.log(userInputAndFeedback);
    // setUserInputAndFeedback([...userInputAndFeedback, {guessNumber: 69}])
    return (
        <>
            <input type="number" placeholder='Enter Career Points' autoFocus onKeyDown={(e) => handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback)} />
        </>
    )
}

function InputTable({ userInputAndFeedback, setUserInputAndFeedback, isAnimationTriggered }) {

    console.log(userInputAndFeedback)
    
    
    return (
        <>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow index={index} guess={pastGuess.guessNumber} arrowDirection={pastGuess.ArrowFeedback }/>
                })}
            </ul>
            { !isAnimationTriggered && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback}/>}
        </>
    )
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback) {
    // console.log(e.target.value);
    if (e.key === 'Enter' && e.target.value) {
        setUserInputAndFeedback([...userInputAndFeedback, {guessNumber: e.target.value, colorFeedback: 'red', ArrowFeedback: 'up'}])
        e.target.value = '';
    }
}


function StaticApp({ playerInfo }) {
    const [userInputAndFeedback, setUserInputAndFeedback] = useState([]);
    const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
    const [gameOverAnimationText, setGameOverAnimationText] = useState('');

    //  TODO FIX. chatgpt wrote this and it is not readable at all
    function checkGameState() {
        if (userInputAndFeedback.some((feedback) => parseInt(feedback.guessNumber) === playerInfo.careerPoints)) {
            console.log(playerInfo.careerPoints);
            setGameOverAnimationText("You Win! :)");
            setIsAnimationTriggered(true);
        }
        else if (userInputAndFeedback.length === 5) {
            setGameOverAnimationText('You Lose :(')
            setIsAnimationTriggered(true);
        } 
    }

    useEffect(() => {
        checkGameState();

        
    }, [userInputAndFeedback]);

    return (
        <div id="page">
            <TitleBar />
            <PlayerSection image={playerInfo.image} text="Example" name={playerInfo.name} />
            <AttemptsAndPoints attempts={3} points={150} userInputAndFeedback={userInputAndFeedback} />
            {isAnimationTriggered && 
                <div className='animation'>
                    <div >{gameOverAnimationText}</div>
                    <div>{playerInfo.name} has {playerInfo.careerPoints} career points</div>
                </div>
            
            }
            <InputTable userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} isAnimationTriggered={isAnimationTriggered}/>
        </div>

    )
}

export default StaticApp