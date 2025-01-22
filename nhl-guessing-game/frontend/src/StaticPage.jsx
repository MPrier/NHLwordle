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
        <div>
            <h3>{attempts}/5 attempts remaining</h3>
            <h3>Points: {points}</h3>
        </div>
    )
}

function InputRow({ guess, colorFeedback, arrowDirection }) {

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
            backgroundColor: '#007BFF',
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

    return (
        <div>
            <li style={styles.row}>
                <div style={styles.rectangle1}>{guess}</div>
                <div style={styles.rectangle2}>upies</div>
            </li>
        </div>
    )
}
function StaticApp() {
    return (
        <div id="page">
            <TitleBar />
            <PlayerSection image={image} text="Example" name="The Great One" />
            <AttemptsAndPoints attempts={3} points={150} />
            <InputRow guess={1500} colorFeedback="red" arrowDirection="up" />
        </div>

    )
}

export default StaticApp