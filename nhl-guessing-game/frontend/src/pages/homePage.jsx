import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function HomePage() {
    return (
        <div>
            <h1>Welcome To Puckle!</h1>
            <h3>Game Modes</h3>
            <Link to="/app">
                <button>Top 100 Career Points</button>
            </Link>
            <Link to="/dailychallenge">
                <button>Daily Challenge</button>
            </Link>
            <Link to="/staticpage">
                <button>Static Page</button>
            </Link>

            <Link to="/gamepage">
                <button>Game Bitch</button>
            </Link>

            {/* <Link to="/app">
                <button>Best Season Points</button>
            </Link> */}
            
        </div>
    );
}

export default HomePage