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

function AttemptsAndPoints({ attempts, points }) {
    return (
        <>
            <h3>{attempts}/5 attempts remaining</h3>
            <h3>Points: {points}</h3>
        </>
    )
}

function InputRow({ guess, colorFeedback, arrowDirection, index }) {

    const styles = {
        row: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
        },
        rectangle1: {
            width: '200px', // Adjust the size as needed
            height: '50px',
            borderRadius: '8px',
            backgroundColor: "grey",
            marginRight: '10px',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
        },
        rectangle2: {
            width: '100px', // Half the width of rectangle1
            height: '50px',
            borderRadius: '8px',
            backgroundColor: '#28A745',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
        },
    };
    console.log(index);
    return (
        <>
            <li style={styles.row} key={index}>
                <div style={styles.rectangle1}>{guess}</div>
                <div style={styles.rectangle2}>{arrowDirection}</div>
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

function InputTable({ userInputAndFeedback, setUserInputAndFeedback }) {

    console.log(userInputAndFeedback)
    
    return (
        <div>
            <ul>
                {userInputAndFeedback.map((pastGuess, index) => {
                    return <InputRow index={index} guess={pastGuess.guessNumber} arrowDirection={pastGuess.ArrowFeedback }/>
                })}
            </ul>
            <InputBar userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback}/>
        </div>
    )
}

function handleKeyDown(e, setUserInputAndFeedback, userInputAndFeedback) {
    // console.log(e.target.value);
    if (e.key === 'Enter' && e.target.value) {
        setUserInputAndFeedback([...userInputAndFeedback, {guessNumber: e.target.value, colorFeedback: 'red', ArrowFeedback: 'up'}])
    }
}

function StaticApp({ playerInfo }) {
    const [userInputAndFeedback, setUserInputAndFeedback] = useState([{guessNumber: 1300, colorFeedback: 'red', ArrowFeedback: 'up'},{guessNumber: 2200, colorFeedback: 'green', ArrowFeedback: 'down'}])

    // setUserInputAndFeedback([...userInputAndFeedback, {guessNumber: 2200, colorFeedback: 'green', ArrowFeedback: 'down'}]);
    
    return (
        <div id="page">
            <TitleBar />
            <PlayerSection image={playerInfo.image} text="Example" name={playerInfo.name} />
            <AttemptsAndPoints attempts={3} points={150} />
            <InputTable userInputAndFeedback={userInputAndFeedback} setUserInputAndFeedback={setUserInputAndFeedback}/>
        </div>

    )
}

export default StaticApp