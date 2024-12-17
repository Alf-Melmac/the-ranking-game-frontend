import {JSX, useEffect, useState} from 'react';
import {Alert, Text} from '@mantine/core';
import {FancySpinner} from '../FancySpinner';
import apiClient from '../../common/hook/apiClient';
import {useQuery} from '@tanstack/react-query';
import {useGameContext} from '../../common/GameContext';
import dayjs from 'dayjs';
import {Starting} from '../../2_starting/Starting';
import {FETCH_INTERVAL} from '../../common/constant/constants';

export function UserLobby(): JSX.Element {
	const {gameId} = useGameContext();

	const [enabled, setEnabled] = useState(true);
	const getStartTime = () => apiClient.get(`/game/${gameId}/start-time`).then((res) => res.data);
	const {data: startTime, isError} = useQuery<string, Error>({
		queryKey: ['start-time', gameId],
		queryFn: getStartTime,
		enabled,
		retry: false,
		refetchInterval: FETCH_INTERVAL,
		gcTime: 0,
	});

	useEffect(() => {
		setEnabled(!startTime);
	}, [startTime]);

	return <>
		{isError && <Alert color={'red'}>Startzeit konnte nicht abgerufen werden</Alert>}
		{!startTime ? <>
				<Text size={'xl'}>Warte auf den Host...</Text>
				<FancySpinner/>
			</>
			:
			<Starting startIn={dayjs.utc(startTime).diff(dayjs.utc())}/>
		}
	</>;
}
