import {createContext, useState} from "react";

export const GameContext = createContext({
    size:4,
    gameCount:0,
    setGameCount: () => {},
    setSize: () => {}
});


export function GameContextProvider({children}) {
    const [gameCount, setGameCount] = useState(0);
    const [size, setSize] = useState(4);

    const ContextValue = {
        size: size,
        gameCount: gameCount,
        setSize: setSize,
        setGameCount: setGameCount,
    }

    return <GameContext.Provider value={ContextValue}>
        {children}
    </GameContext.Provider>
}