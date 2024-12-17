import {JSX, useEffect} from 'react';
import {Text} from '@mantine/core';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import {useNavigate} from 'react-router';
import {useTimeout} from '@mantine/hooks';
import {ROUND_DURATION, ROUND_DURATION_MS} from '../../common/constant/constants';
import apiClient from '../../common/hook/apiClient';
import {useGameContext} from '../../common/GameContext';
import {useQuery} from '@tanstack/react-query';
import {useQuestionContext} from '../QuestionContext';

export function HostScreen(): JSX.Element {
	const navigate = useNavigate();
	useTimeout(() => navigate('/results'), ROUND_DURATION_MS, {autoInvoke: true});

	const {gameId} = useGameContext();
	const {question} = useQuestionContext();
	const getFastFinish = () => apiClient.get(`/game/${gameId}/question/${question?.id}/fast-forward`).then((res) => res.data);
	const {data} = useQuery<boolean, Error>({
		queryKey: ['fast-finish', gameId],
		queryFn: getFastFinish,
		enabled: !!question,
		retry: false,
		refetchInterval: 1000,
		gcTime: 0,
	});

	useEffect(() => {
		if (data) {
			navigate('/results');
		}
	}, [data]);

	return <CountdownCircleTimer isPlaying isSmoothColorTransition={false} duration={ROUND_DURATION}
								 size={300} strokeWidth={30}
								 colors={['#1864ab', '#fcc419', '#c92a2a', '#c92a2a']}
								 colorsTime={[ROUND_DURATION, ROUND_DURATION / 2, ROUND_DURATION * 0.25, 0]}>
		{({remainingTime}) => {
			const minutes = Math.floor(remainingTime / 60);
			const seconds = ('0' + remainingTime % 60).slice(-2);

			return <Text size={'xl'}>{minutes}:{seconds}</Text>;
		}}
	</CountdownCircleTimer>;
}
