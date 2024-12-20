import {createContext, PropsWithChildren, useContext, useMemo} from 'react';
import {useGetPlayers} from '../common/hook/useGetPlayers';
import {useGameContext} from '../common/GameContext';
import apiClient from '../common/hook/apiClient';
import {useQuery} from '@tanstack/react-query';

export type QuestionDto = {
	id: string;
	title: string;
	description: string;
	category: QuestionCategory;
}

enum QuestionCategory {
	WARM_UP = 'WARM_UP',
	CHALLENGER = 'CHALLENGER',
	SPICY = 'SPICY',
}

type QuestionContextType = {
	question: QuestionDto | undefined;
	players: string[];
}

const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export function QuestionProvider({children}: Readonly<PropsWithChildren>) {
	const {query: {data: players}} = useGetPlayers(true);

	const {gameId} = useGameContext();
	const getCurrentQuestion = () => apiClient.get(`/game/${gameId}/question`).then(res => res.data);
	const {data: question} = useQuery<QuestionDto, Error>({
		queryKey: ['currentQuestion', gameId],
		queryFn: getCurrentQuestion,
	});

	const contextValue = useMemo(() => ({
		question: question,
		players: players ?? [],
	}), [question, players]);

	return <QuestionContext.Provider value={contextValue}>{children}</QuestionContext.Provider>;
}

export function useQuestionContext() {
	const context = useContext(QuestionContext);
	if (context === undefined) {
		throw new Error('useQuestionContext must be used within a QuestionProvider');
	}
	return context;
}
