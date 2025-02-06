import StaticApp from "../StaticPage";
import { ContextProvider } from "../context/context";

function GamePage() {
    return (
        <ContextProvider>
            <StaticApp />
        </ContextProvider>
    )
}

export default GamePage