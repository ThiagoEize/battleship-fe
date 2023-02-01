import { createContext, useContext, useEffect, useState } from "react";

export const GameContext = createContext();

export function UseGameContext() {
  return useContext(GameContext);
}



export const GameContextProvider = ({children}) => {
    const [selectedCell, setSelectedCell] = useState(null)
    return (
        <GameContext.Provider value={{
            selectedCell,
            setSelectedCell
        }}>
            {children}
        </GameContext.Provider>
    )
}