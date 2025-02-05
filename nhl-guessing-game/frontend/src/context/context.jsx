import {createContext, useState } from "react";

const UserContext = createContext();

function ContextProvider({children}) {
    console.log(JSON.parse(localStorage.getItem("UserInputAndFeedback")))
    const [userInputAndFeedback, setUserInputAndFeedback] = useState(() => {
        return JSON.parse(localStorage.getItem("UserInputAndFeedback")) || [];
    });
    return <UserContext.Provider value={{userInputAndFeedback, setUserInputAndFeedback}}>
        {children}
    </UserContext.Provider>
}

export {ContextProvider, UserContext};