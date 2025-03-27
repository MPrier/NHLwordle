import {createContext, useState } from "react";
import image from "../img/image.png";
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect } from "react";

const UserContext = createContext();

function ContextProvider({children}) {
    const [userInputAndFeedback, setUserInputAndFeedback] = useState(() => {
        return JSON.parse(localStorage.getItem("UserInputAndFeedback")) || [];
    });
    // const [playerInfo, setPlayerInfo] = useState({ image: image });

    // useEffect(() => {
    //     const fetchPlayerData = async () => {
    //         try {
    //             const data = await getDailyPlayerData(); // Fetch player object
    //             setPlayerInfo({ ...playerInfo, name: data[0].name, careerPoints: data[0].career_points, date: data[0].date_assigned })
    //         } catch (error) {
    //             console.error('Error fetching player data:', error);
    //         }
    //     };

    //     fetchPlayerData();
    // }, [])
    const playerInfo = {image: image, name: "Farts", careerPoints: 1000}

    return <UserContext.Provider value={{userInputAndFeedback, setUserInputAndFeedback, playerInfo}}>
        {children}
    </UserContext.Provider>
}

export {ContextProvider, UserContext};