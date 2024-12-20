import {JSX, useState} from 'react';
import {Button, Card, Group, Stack} from '@mantine/core';
import classes from './UserScreen.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons';
import apiClient, {voidFunction} from '../../common/hook/apiClient';
import {useGameContext} from '../../common/GameContext';
import {useQuestionContext} from '../QuestionContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router';
import {useTimeout} from '@mantine/hooks';
import {ROUND_DURATION_MS} from '../../common/constant/constants';

export function UserScreen(): JSX.Element {
	const {players} = useQuestionContext();

	return players.length ? <UserScreenWithData players={players}/> : <></>;
}

function UserScreenWithData({players}: Readonly<{ players: string[] }>): JSX.Element {
	const [place, setPlace] = useState(0);
	const [toOrder, setToOrder] = useState([...players]);
	const [ranking, setRanking] = useState(new Map<number, string>());

	function findNextPlace(newRanking: Map<number, string>) {
		for (let i = 0; i < players.length; i++) {
			if (!newRanking.has(i)) {
				return i;
			}
		}
		return -1;
	}

	return <>
		<Group justify={'space-between'} w={'100%'} maw={350}>
			<Stack gap={'xs'}>
				{[...Array(players.length)].map((_, i) => (
					<Group key={i}>
						<Card className={classes.rankee}
							  mod={{first: i === 0, second: i === 1, third: i === 2}}>
							{i + 1}.
						</Card>
						{
							ranking.has(i) ?
								<Button variant={'outline'}
										onClick={() => {
											let newRanking = new Map(ranking);
											newRanking.delete(i);
											setRanking(newRanking);
											setToOrder([...toOrder, ranking.get(i)!]);
											setPlace(() => findNextPlace(newRanking));
										}}>
									{ranking.get(i)}
								</Button>
								:
								place === i ?
									<Button variant="gradient"
											gradient={{from: 'teal', to: 'indigo', deg: 90}}
											onClick={() => {
												setPlace(i);
											}}>
										?
									</Button>
									:
									<Button variant="light"
											onClick={() => {
												setPlace(i);
											}}>
										?
									</Button>
						}
					</Group>
				))}
			</Stack>
			<Stack>
				{toOrder.map((player) => (
					<Button variant="gradient"
							gradient={{from: 'grape', to: 'indigo', deg: 90}}
							onClick={() => {
								let newRanking = new Map(ranking).set(place, player);
								setRanking(newRanking);
								setPlace(() => findNextPlace(newRanking));
								setToOrder(toOrder.filter((p) => p !== player));
							}} key={player}>{player}</Button>
				))}
			</Stack>
		</Group>

		<PostAnswer visible={toOrder.length === 0} ranking={createRankingArray(ranking)}/>
	</>;
}

function createRankingArray(ranking: Map<number, string>): string[] {
	let array = new Array<string>(ranking.size);
	ranking.forEach((value, key) => {
		array[key] = value;
	});
	return array;
}

type PostAnswerProps = {
	visible: boolean;
	ranking: string[];
}

function PostAnswer({visible, ranking}: Readonly<PostAnswerProps>): JSX.Element {
	const {gameId} = useGameContext();
	const {question} = useQuestionContext();
	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const postAnswer = () => apiClient.post(`/game/${gameId}/question/${question?.id}`, ranking).then(voidFunction);
	const {mutate, isPending} = useMutation<void, Error>({
		mutationFn: postAnswer,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['start-time', gameId]});
			navigate('/join/waiting-room');
		},
	});

	useTimeout(() => mutate(), ROUND_DURATION_MS, {autoInvoke: true});

	return (visible && question) ?
		<Button variant={'gradient'} gradient={{from: 'grape', to: 'orange', deg: 165}} loading={isPending}
				leftSection={<FontAwesomeIcon icon={faFlagCheckered}/>}
				onClick={() => mutate()}>
			Ich bin fertig
		</Button>
		:
		<></>;
}
