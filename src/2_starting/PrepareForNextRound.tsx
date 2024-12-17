import {JSX, useEffect, useState} from 'react';
import {useGameContext} from '../common/GameContext';
import apiClient from '../common/hook/apiClient';
import {useMutation} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {Starting} from './Starting';
import {useNavigate} from 'react-router';

export function PrepareForNextRound(): JSX.Element {
	const {gameId} = useGameContext();
	const navigate = useNavigate();
	const [startIn, setStartIn] = useState<number | undefined>(undefined);

	const startGame = () => apiClient.put(`/game/${gameId}/start`).then((res) => res.data);
	const {mutate} = useMutation<string | null, Error>({
		mutationFn: startGame,
		onSuccess: (data) => {
			if (data === null) {
				navigate('/results/game');
				return;
			}
			data && setStartIn(dayjs.utc(data).diff(dayjs.utc()));
		},
	});

	useEffect(() => {
		mutate();
	}, []);

	return startIn !== undefined ? <Starting startIn={startIn} host/> : <></>;
}
