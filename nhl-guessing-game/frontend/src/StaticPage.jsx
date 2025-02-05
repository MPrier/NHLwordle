import { useContext, useEffect, useState } from 'react';
import "./components/Header.css";
import "./page.css";
import image from './img/image.png';
import { Context } from './pages/gamePage';
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
    console.log(colorFeedback);
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
    console.log(userInputAndFeedback);
    let playerInfo = useContext(Context);
    console.log(playerInfo);
    // setUserInputAndFeedback([...userInputAndFeedback, {guessNumber: 69}])
    return (
        <>
            <input type="number" placeholder='Enter Career Points' autoFocus onKeyDown={(e) => handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, playerInfo.careerPoints)} />
        </>
    )
}

function InputTable({ userInputAndFeedback, setUserInputAndFeedback, isAnimationTriggered }) {

    console.log(userInputAndFeedback)


    return (
        <>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow index={index} guess={pastGuess.guessNumber} colorFeedback={pastGuess.colorFeedback} arrowDirection={pastGuess.ArrowFeedback} />
                })}
            </ul>
            {!isAnimationTriggered && <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} />}
        </>
    )
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback, careerPoints) {
    if (e.key === 'Enter' && e.target.value) {
        const feedback = feedbackHandler(careerPoints, e.target.value);
        // TODO add Feedback handler to provide accerate feedback
        localStorage.setItem("UserInputAndFeedback",JSON.stringify([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback[0], ArrowFeedback: feedback[1] }]))
        setUserInputAndFeedback([...userInputAndFeedback, { guessNumber: e.target.value, colorFeedback: feedback[0], ArrowFeedback: feedback[1] }])
        e.target.value = '';
    }
}

function feedbackHandler(careerPoints, userGuess) {
    careerPoints = Number(careerPoints);
    userGuess = Number(userGuess);
    const difference = Math.abs(careerPoints - userGuess);
    const average = (careerPoints + userGuess) / 2;
    const percentageDifference = (difference / average) * 100;
    console.log(percentageDifference);
    let colorFeedback;
    if (percentageDifference <= 5) {
        colorFeedback = "green";
    }
    else if (percentageDifference <= 25) {
        colorFeedback = "yellow";
    }
    else {
        colorFeedback = "red";
    }

    const arrowFeedback = colorFeedback === "green"
        ? "correct"
        : careerPoints > userGuess ? "up" : "down";

    return [colorFeedback, arrowFeedback];

}
function StaticApp(didUserPlayToday, setDidUserPlayToday) {
    // const [userInputAndFeedback, setUserInputAndFeedback] = useState([]);
    const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
    const [gameOverAnimationText, setGameOverAnimationText] = useState('');
    const playerInfo = useContext(Context);
    const {userInputAndFeedback, setUserInputAndFeedback} = useContext(UserContext);
    
    
    
    
    console.log("didUserPlayToday " + JSON.stringify(didUserPlayToday));
    //  TODO FIX. chatgpt wrote this and it is not readable at all
    function checkGameState() {
        if (userInputAndFeedback.some((feedback) => feedback.colorFeedback === "green")) {
            
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
            <InputTable userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback} isAnimationTriggered={isAnimationTriggered} />
        </div>

    )
}

export default StaticApp