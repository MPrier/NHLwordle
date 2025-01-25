import StaticApp from "../StaticPage";
import image from "../img/image.png";
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect, useState, createContext } from "react";

export const Context = createContext();

function GamePage() {
    const [playerInfo, setPlayerInfo] = useState({image: image});
    
    
    useEffect(() => {
            const fetchPlayerData = async () => {
              try {
                  const data = await getDailyPlayerData(); // Fetch player object
                  setPlayerInfo({...playerInfo, name: data[0].name, careerPoints: data[0].career_points})
              } catch (error) {
                  console.error('Error fetching player data:', error);
              }
          };
        
          fetchPlayerData();
          }, [])
    
    
    console.log(playerInfo);
    return (
        <Context.Provider value={playerInfo}>
            <StaticApp />
        </Context.Provider>
        
    )
}

export default GamePage