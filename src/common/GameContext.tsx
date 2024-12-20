import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState} from 'react';

type GameContextType = {
	gameId: number | undefined;
	setGameId: Dispatch<SetStateAction<number | undefined>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({children}: Readonly<PropsWithChildren>) {
	const [id, setId] = useState<number>();

	const contextValue = useMemo<GameContextType>(() => (
		{
			gameId: id,
			setGameId: setId,
		}
	), [id, setId]);

	return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
	const context = useContext(GameContext);
	if (context === undefined) {
		throw new Error('useGameContext must be used within a GameContextProvider');
	}
	return context;
}
