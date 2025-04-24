import {createContext, useState } from "react";
import image from "../img/image.png";
import yash from "../img/yash.png"
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect } from "react";
import { use } from "react";
import { Await } from "react-router-dom";

const UserContext = createContext();

function ContextProvider({children}) {
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [userInputAndFeedback, setUserInputAndFeedback] = useState([]);
    const [playerInfo, setPlayerInfo] = useState({ image: yash });
    const [hasFetched, setHasFetched] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false); 

    
    const fetchPlayerData = async () => {
        console.log("fetch data")
        try {
            const data = await getDailyPlayerData(); // Fetch player object
            const fetchedPlayerInfo = {
                ...playerInfo,
                name: data[0].Name,
                careerPoints: data[0].CareerPoints,
                date: data[0].Date,
            };
            setPlayerInfo(fetchedPlayerInfo)
            localStorage.setItem("PlayerInfo", JSON.stringify(fetchedPlayerInfo));
            
            setHasFetched(true);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    useEffect(() => {
        // Check and update localStorage if the date has changed
        const storedDate = localStorage.getItem("UserInputDate");
        const init = async () => {
            if (currentDate !== storedDate) {
                console.log('Date Change')
                // Date is different, update localStorage and reset user input
                localStorage.setItem("UserInputDate", currentDate);
                localStorage.setItem("UserInputAndFeedback", JSON.stringify([])); // Optional: Clear previous feedback
                setUserInputAndFeedback([]); // Reset the state to empty array
                await fetchPlayerData();
                
                
            } else {
                // Load feedback if date is the same
                const storedFeedback = JSON.parse(localStorage.getItem("UserInputAndFeedback")) || [];
                setUserInputAndFeedback(storedFeedback);
                
            }
            setIsInitialized(true);
        }
        init()
    }, [currentDate]);

    useEffect(() => {
        const storedPlayerInfo = JSON.parse(localStorage.getItem("PlayerInfo"));
    
        if (storedPlayerInfo && storedPlayerInfo.name && storedPlayerInfo.careerPoints) {
            setPlayerInfo(storedPlayerInfo)
        } else {
            fetchPlayerData();
        }
        
    }, [])
    
    return <UserContext.Provider value={{userInputAndFeedback, setUserInputAndFeedback, playerInfo, isInitialized}}>
        {isInitialized ? children : null}
    </UserContext.Provider>
}

export {ContextProvider, UserContext};