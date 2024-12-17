import {useState} from 'react';
import apiClient from './apiClient';
import {useQuery} from '@tanstack/react-query';
import {useGameContext} from '../GameContext';
import {FETCH_INTERVAL} from '../constant/constants';

export function useGetPlayers(once = false) {
	const {gameId} = useGameContext();

	const [enabled, setEnabled] = useState(true);
	const getPlayers = () => apiClient.get(`/game/${gameId}/players`).then((res) => res.data);
	const query = useQuery<string[], Error>({
		queryKey: ['players', gameId],
		queryFn: getPlayers,
		enabled,
		retry: false,
		refetchInterval: once ? undefined : FETCH_INTERVAL,
	});

	return {
		query,
		setEnabled,
	};
}
