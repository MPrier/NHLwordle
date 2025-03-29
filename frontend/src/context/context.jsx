import {createContext, useState } from "react";
import image from "../img/image.png";
import { getDailyPlayerData } from "../api_calls/api";
import { useEffect } from "react";

const UserContext = createContext();

function ContextProvider({children}) {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const [userInputAndFeedback, setUserInputAndFeedback] = useState([]);
    const [playerInfo, setPlayerInfo] = useState({ image: image });

    useEffect(() => {
        // Check and update localStorage if the date has changed
        const storedDate = localStorage.getItem("UserInputDate");
        console.log('Date Change')
        if (currentDate !== storedDate) {
            // Date is different, update localStorage and reset user input
            localStorage.setItem("UserInputDate", currentDate);
            localStorage.setItem("UserInputAndFeedback", JSON.stringify([])); // Optional: Clear previous feedback
            setUserInputAndFeedback([]); // Reset the state to empty array
        } else {
            // Load feedback if date is the same
            const storedFeedback = JSON.parse(localStorage.getItem("UserInputAndFeedback")) || [];
            setUserInputAndFeedback(storedFeedback);
        }
    }, [currentDate]);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const data = await getDailyPlayerData(); // Fetch player object
                setPlayerInfo({ ...playerInfo, name: data[0].Name, careerPoints: data[0].CareerPoints, date: data[0].Date })
            } catch (error) {
                console.error('Error fetching player data:', error);
            }
        };

        fetchPlayerData();
    }, [])
    
    return <UserContext.Provider value={{userInputAndFeedback, setUserInputAndFeedback, playerInfo}}>
        {children}
    </UserContext.Provider>
}

export {ContextProvider, UserContext};