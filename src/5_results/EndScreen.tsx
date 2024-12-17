import {JSX, useState} from 'react';
import {Avatar, Box, Button, Card, Center, Container, Group, Stack, Text, Transition} from '@mantine/core';
import classes from './EndScreen.module.css';
import {useTimeout} from '@mantine/hooks';
import {useNavigate} from 'react-router';
import {useGameContext} from '../common/GameContext';
import apiClient from '../common/hook/apiClient';
import {QuestionDto} from '../3_question/QuestionContext';
import {useQuery} from '@tanstack/react-query';
import {Question} from '../common/component/Question';
import {getPlayer} from '../common/constant/players';

type Result = {
	question: QuestionDto | null;
	scores: Score[];
}

type Score = {
	player: string;
	score: number;
}

export function EndScreen({round = true}: Readonly<{ round?: boolean }>): JSX.Element {
	const {gameId} = useGameContext();
	const getLastResult = () => apiClient.get(`/game/${gameId}/result${round ? '/last' : ''}`).then(res => res.data);
	const {data} = useQuery<Result, Error>({
		queryKey: ['result', gameId, round],
		queryFn: getLastResult,
		gcTime: 0,
	});

	if (!data) return <></>;
	return <EndRoundScreenWitData {...data}/>;
}

const TRANSITION_DELAY = 600;

function EndRoundScreenWitData({question, scores}: Readonly<Result>): JSX.Element {
	let first = getPlayer(scores[0].player)!;
	let second = getPlayer(scores[1].player)!;
	let third = getPlayer(scores[2].player)!;

	const [open, setOpen] = useState(false);
	useTimeout(() => setOpen(true), (scores.length + 1) * TRANSITION_DELAY, {autoInvoke: true});

	return <Stack mx={'xl'} my={'md'} gap={'sm'}>
		{question && <Question question={question}/>}

		<Box h={176 + 32}>
			<Transition mounted={open} transition={'pop'} duration={3500} timingFunction={'ease'}>
				{(styles) => <Group wrap={'nowrap'} justify={'center'} align={'flex-end'} mt={'xl'} style={styles}>
					<Card withBorder padding={'md'} radius={'md'} w={'9rem'} h={'10rem'} shadow={'md'}
						  className={classes.second} style={{overflow: 'visible'}}>
						<Center>
							<Avatar
								src={second.avatar}
								className={classes.avatar}
								size={60}
								mt={-50}/>
						</Center>
						<Text ta={'center'} size={'lg'} fw={'bold'}>2</Text>
						<Text ta={'center'} size={'lg'}>{second.name}</Text>
						<Box style={{marginTop: 'auto'}}>
							<Text ta={'center'} c={'dark.5'}>{scores[1].score}</Text>
							<Text ta={'center'} c={'dark.5'}>Punkte</Text>
						</Box>
					</Card>
					<Card withBorder padding={'md'} radius={'md'} w={'10rem'} h={'11rem'} shadow={'lg'}
						  className={classes.first} style={{overflow: 'visible'}}>
						<Center>
							<Avatar
								src={first.avatar}
								className={classes.avatar}
								size={60}
								mt={-50}/>
						</Center>
						<Text ta={'center'} size={'lg'} fw={'bold'}>1</Text>
						<Text ta={'center'} size={'lg'}>{first.name}</Text>
						<Box style={{marginTop: 'auto'}}>
							<Text ta={'center'} c={'dark.5'}>{scores[0].score}</Text>
							<Text ta={'center'} c={'dark.5'}>Punkte</Text>
						</Box>
					</Card>
					<Card withBorder padding={'md'} radius={'md'} w={'9rem'} h={'9.5rem'} shadow={'md'}
						  className={classes.third}
						  style={{overflow: 'visible'}}>
						<Center>
							<Avatar
								src={third.avatar}
								className={classes.avatar}
								size={60}
								mt={-50}/>
						</Center>
						<Text ta={'center'} size={'lg'} fw={'bold'}>3</Text>
						<Text ta={'center'} size={'lg'}>{third.name}</Text>
						<Box style={{marginTop: 'auto'}}>
							<Text ta={'center'} c={'dark.5'}>{scores[2].score}</Text>
							<Text ta={'center'} c={'dark.5'}>Punkte</Text>
						</Box>
					</Card>
				</Group>}
			</Transition>
		</Box>

		<Container>
			{scores.slice(3).map((score, i) => <SchlechteSpieler key={score.player} score={score} place={i + 4}/>)}
		</Container>

		<NextRoundButton showAfter={((scores.length + 1) * TRANSITION_DELAY) + 3500}/>
	</Stack>;
}

type SchlechteSpielerProps = {
	score: Score;
	place: number;
};

function SchlechteSpieler({score, place}: Readonly<SchlechteSpielerProps>): JSX.Element {
	const [open, setOpen] = useState(false);
	useTimeout(() => setOpen(true), place * TRANSITION_DELAY, {autoInvoke: true});

	return (
		<Transition
			mounted={open}
			transition={'fade-up'}
			duration={400}
			timingFunction={'ease'}
		>
			{(styles) => <Group justify={'space-between'} wrap={'nowrap'} style={styles}>
				<Group>
					<Text fw={'semibold'}>{place}.</Text>
					<Avatar src={getPlayer(score.player)!.avatar}/>
					<Text>{score.player}</Text>
				</Group>
				<Text>{score.score} Punkte</Text>
			</Group>}
		</Transition>
	);
}

type NextRoundButtonProps = {
	showAfter: number;
}

function NextRoundButton({showAfter}: Readonly<NextRoundButtonProps>): JSX.Element {
	const [open, setOpen] = useState(false);
	useTimeout(() => setOpen(true), showAfter, {autoInvoke: true});

	const navigate = useNavigate();
	return <Transition
		mounted={open}
		transition={'fade-up'}
		duration={400}
		timingFunction={'ease'}
	>
		{(styles) => <Button style={styles} onClick={() => navigate('/host/next-round')}>Nächste Runde</Button>}
	</Transition>;
}
