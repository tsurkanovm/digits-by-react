import React, {useState} from "react";

type GameContextObj = {
    size: number,
    gameCount: number,
    setGameCount:  (count: number) => void,
    setSize:  (size: number) => void,
}
export const GameContext = React.createContext<GameContextObj>({
    size:4,
    gameCount:0,
    setGameCount: () => {},
    setSize: () => {}
});

const GameContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [gameCount, setGameCount] = useState(0);
    const [size, setSize] = useState(4);

    const ContextValue : GameContextObj = {
        size: size,
        gameCount: gameCount,
        setSize: setSize,
        setGameCount: setGameCount,
    }

    return <GameContext.Provider value={ContextValue}>
        {props.children}
    </GameContext.Provider>
}

export default GameContextProvider;