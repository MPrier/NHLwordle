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

function PlayerSection({image, text, name}) {
    return (
        <div>
            <img src={image} alt={text} />
            <h2>{name}</h2>
        </div>

    )
}

function AttemptsAndPoints({attempts, points}) {
    return (
        <div>
            <h3>{attempts}/5 attempts remaining</h3>
            <h3>Points: {points}</h3>
        </div>
    )
}
function StaticApp() {
    return (
        <div id="page">
            <TitleBar />
            <PlayerSection image={image} text="Example" name="The Great One"/>
            <AttemptsAndPoints attempts={3} points={150}/>
        </div>

    )
}

export default StaticApp