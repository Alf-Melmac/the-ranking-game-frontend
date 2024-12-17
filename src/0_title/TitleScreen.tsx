import {JSX} from 'react';
import {Container, Stack} from '@mantine/core';
import apiClient from '../common/hook/apiClient';
import {useMutation} from '@tanstack/react-query';
import {Link, useNavigate} from 'react-router';
import {GameTitle} from '../common/component/GameTitle';
import {HostButton, JoinButton} from '../common/component/Buttons';
import {useGameContext} from '../common/GameContext';

export function TitleScreen(): JSX.Element {
	return <Container>
		<Stack gap={'xl'} mx={'xl'} my={'md'}>
			<GameTitle/>
			<Stack gap={'xs'}>
				<Host/>
				<Join/>
			</Stack>
		</Stack>
	</Container>;
}

function Host(): JSX.Element {
	const {setGameId} = useGameContext();
	const navigate = useNavigate();
	const postHostGame = () => apiClient.post('/game/host').then((res) => res.data);
	const {mutate, isPending} = useMutation<number, Error>({
		mutationFn: postHostGame,
		onSuccess: (gameId) => {
			setGameId(gameId);
			navigate('/host/waiting-room');
		},
	});

	return <HostButton size={'xl'} loading={isPending} onClick={() => mutate()}>
		Spiel hosten
	</HostButton>;
}

function Join(): JSX.Element {
	return <JoinButton size={'xl'} component={Link} to={'/join'}>
		Spiel beitreten
	</JoinButton>;
}
