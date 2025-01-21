import React, { useEffect, useState } from "react";
import Modal from "./popup";
import PlayerPage from "./PlayerComps";
import { getDailyPlayerData } from "./api_calls/api";

function DailyChallenge() {

    const [pastGuesses, setPastGuesses] = useState([]);
    const [player, setPlayer] = useState('');
    const [count, setCount] = useState(5);
    const [bestGuess, setBestGuess] = useState(0);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchPlayerData = async () => {
          try {
              const data = await getDailyPlayerData(); // Fetch player object
              console.log("fuckin data:" + data.id);
              console.log(JSON.stringify(data[0]));
              setData(data)
              setPlayer(data.name); // Set the entire object in state
          } catch (error) {
              console.error('Error fetching player data:', error);
          }
      };
    
      fetchPlayerData();
      }, [])

    return (
        <div>
            <PlayerPage
                pastGuesses={pastGuesses}
                player={player}
                count={count}
                bestGuess={bestGuess}
            />
        </div>
    )
}

export default DailyChallenge