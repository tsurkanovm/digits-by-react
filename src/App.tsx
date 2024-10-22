import {GameBoard} from "./components/GameBoard";
import {BestResults} from "./components/BestResults";
import GameContextProvider from "./store/game-context";


function App() {
    return (
        <GameContextProvider>
            <GameBoard/>
            <BestResults/>
        </GameContextProvider>
    );
}

export default App;
