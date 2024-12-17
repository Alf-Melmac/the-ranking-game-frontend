import {Dispatch, JSX, SetStateAction, useEffect, useState} from 'react';
import {generatePath, Navigate} from 'react-router';
import {Alert, Avatar, Box, Button, Card, Group, Stack, Text} from '@mantine/core';
import QRCode from 'react-qr-code';
import apiClient from '../../common/hook/apiClient';
import {useMutation} from '@tanstack/react-query';
import {getPlayer} from '../../common/constant/players';
import {HostButton} from '../../common/component/Buttons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {FancySpinner} from '../FancySpinner';
import {useGameContext} from '../../common/GameContext';
import dayjs from 'dayjs';
import {Starting} from '../../2_starting/Starting';
import {useGetPlayers} from '../../common/hook/useGetPlayers';

export function Lobby(): JSX.Element {
	const [startIn, setStartIn] = useState<number | undefined>(undefined);

	const {gameId} = useGameContext();
	if (!gameId) {
		return <Navigate to={'/'}/>;
	}

	return <>
		<Stack gap={'sm'} align={'center'}>
			{startIn !== undefined ?
				<Starting startIn={startIn} host/>
				:
				<>
					<Group>
						Beitritt mit dem Code:
						{`${gameId}`.split('').map((char, index) => <Card key={index}>{char}</Card>)}
					</Group>
					<Box bg={'white'} p={16}>
						<QRCode
							value={`${location.origin}${generatePath('/join/:gameId', {gameId: gameId.toString()})}`}/>
					</Box>

					<Text size={'xl'}>Warten auf die Spieler...</Text>

					<FancySpinner/>
				</>
			}
		</Stack>

		<PlayersJoined isStarting={!!startIn}/>
		{startIn === undefined && <StartGame setStartIn={setStartIn}/>}
	</>;
}

function PlayersJoined({isStarting}: Readonly<{ isStarting: boolean }>): JSX.Element {
	const {query: {data, isError}, setEnabled} = useGetPlayers();

	useEffect(() => {
		if (isError) {
			setEnabled(false);
		}
	}, [isError]);
	useEffect(() => {
		setEnabled(!isStarting);
	}, [isStarting]);

	return <>
		{isError && <Alert color={'red'}>
            Spieler können nicht geladen werden. <Button onClick={() => setEnabled(true)}>Retry</Button>
        </Alert>}
		<Group>
			{data?.map((player) => <Card key={player}>
				<Avatar src={getPlayer(player)?.avatar} size={'lg'}/>
				<Text ta={'center'}>{player}</Text>
			</Card>)}
		</Group>
	</>;
}

function StartGame({setStartIn}: Readonly<{ setStartIn: Dispatch<SetStateAction<number | undefined>> }>): JSX.Element {
	const {gameId} = useGameContext();

	const startGame = () => apiClient.put(`/game/${gameId}/start`).then((res) => res.data);
	const {mutate, isPending} = useMutation<string, Error>({
		mutationFn: startGame,
		onSuccess: (data) => {
			data && setStartIn(dayjs.utc(data).diff(dayjs.utc()));
		},
	});

	return <HostButton size={'xl'} leftSection={<FontAwesomeIcon icon={faPlay}/>}
					   loading={isPending} onClick={() => mutate()}>
		Spiel starten
	</HostButton>;
}
