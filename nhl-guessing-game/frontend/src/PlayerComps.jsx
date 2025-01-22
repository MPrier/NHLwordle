import { useEffect, useState } from 'react';

const PlayerPage = ({pastGuesses, player, count, bestGuess}) => {

    
    return (
        <div>
            <h1>Puckle</h1>
            <h2>{player}</h2>
            <h3>{count}/5 attempts left</h3>
            <h3>Points: {bestGuess}</h3>

            <div>
                <ul className='guess-list'>
                    {pastGuesses.map((pastGuess, index) => {
                        return <li key={index} id={pastGuess.color}>
                            <div>{pastGuess.guess} - {pastGuess.feedback}
                                {/* <div id='guess-list-feedback'>{pastGuess.feedback}</div> */}
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PlayerPage;