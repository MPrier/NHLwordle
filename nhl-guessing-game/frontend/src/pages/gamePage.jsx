import StaticApp from "../StaticPage";
import image from "../img/image.png";
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect, useState } from "react";

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
    
    // let playerInfo = {image: image, name:'OOO', careerPoint: 2587};
    console.log(playerInfo);
    return (
        <StaticApp playerInfo={playerInfo} />
    )
}

export default GamePage