import {JSX} from 'react';
import {useNavigate} from 'react-router';
import {useTimeout} from '@mantine/hooks';
import {Text} from '@mantine/core';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

type StartingProps = {
	startIn: number;
	host?: boolean;
};

export function Starting({startIn, host = false}: Readonly<StartingProps>): JSX.Element {
	const navigate = useNavigate();
	useTimeout(() => navigate(`/question${host ? '/host' : ''}`), startIn, {autoInvoke: true});

	return <>
		<Text size={'xl'}>Spiel startet in</Text>
		<CountdownCircleTimer isPlaying duration={startIn / 1000} colors={'#1864ab'}>
			{({remainingTime}) => <Text size={'xl'}>{remainingTime}</Text>}
		</CountdownCircleTimer>
	</>;
}
