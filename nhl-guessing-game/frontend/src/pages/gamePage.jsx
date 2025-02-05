import StaticApp from "../StaticPage";
import image from "../img/image.png";
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect, useState, createContext } from "react";
import { ContextProvider } from "../context/context";

export const Context = createContext();

function GamePage() {
    const [playerInfo, setPlayerInfo] = useState({ image: image });
    const [didUserPlayToday, setDidUserPlayToday] = useState(() => {
        let user;
        if (localStorage.getItem("didUserPlayToday") === true) {
            user = true;
        } else {
            user = false;
        }
        return user;
    });

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const data = await getDailyPlayerData(); // Fetch player object
                setPlayerInfo({ ...playerInfo, name: data[0].name, careerPoints: data[0].career_points })
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        fetchPlayerData();
    }, [])

    useEffect(() => {
        localStorage.setItem("didUserPlayToday", didUserPlayToday);
    }, [didUserPlayToday]);

    return (
        <ContextProvider>
            <Context.Provider value={playerInfo}>
                <StaticApp
                didUserPlayToday={didUserPlayToday}
                setDidUserPlayToday={setDidUserPlayToday} />
            </Context.Provider>
        </ContextProvider>
        

    )
}

export default GamePage