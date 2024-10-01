import {GameBoard} from "./components/GameBoard.jsx";
import {BestResults} from "./components/BestResults.jsx";
import {GameContextProvider} from "./store/game-context.jsx";


function App() {
  return (
    <GameContextProvider>
     <GameBoard/>
    <BestResults/>
    </GameContextProvider>
  );
}

export default App;
