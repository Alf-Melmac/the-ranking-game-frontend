import '@mantine/core/styles.css';
import {JSX} from 'react';
import {MantineProvider} from '@mantine/core';
import {TitleScreen} from './0_title/TitleScreen';
import {EndScreen} from './5_results/EndScreen';
import {UserScreen} from './3_question/player/UserScreen';
import {HostScreen} from './3_question/host/HostScreen';
import {createBrowserRouter, Navigate, RouteObject, RouterProvider} from 'react-router';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Lobby} from './1_lobby/host/Lobby';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {JoinScreen} from './1_lobby/player/join/JoinScreen';
import {JoinWithCode} from './1_lobby/player/join/JoinWithCode';
import {QuestionPage, TitlePage} from './common/RouteElements';
import {UserLobby} from './1_lobby/player/UserLobby';
import {GameProvider} from './common/GameContext';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import {Calculating} from './4_calculating/Calculating';
import {PrepareForNextRound} from './2_starting/PrepareForNextRound';

const routes: RouteObject[] = [
	{
		path: 'host/*',
		element: <TitlePage/>,
		children: [
			{
				path: 'waiting-room',
				element: <Lobby/>,
			},
			{
				path: 'next-round',
				element: <PrepareForNextRound/>,
			},
		],
	},
	{
		path: 'join/*',
		element: <TitlePage/>,
		children: [
			{
				element: <JoinScreen/>,
				index: true,
			},
			{
				path: ':id',
				element: <JoinWithCode/>,
			},
			{
				path: 'waiting-room',
				element: <UserLobby/>,
			},
		],
	},
	{
		path: 'question/*',
		element: <QuestionPage/>,
		children: [
			{
				element: <UserScreen/>,
				index: true,
			},
			{
				path: 'host',
				element: <HostScreen/>,
			},
		],
	},
	{
		path: 'results',
		children: [
			{
				element: <Calculating/>,
				index: true,
			},
			{
				path: 'question',
				element: <EndScreen/>,
			},
			{
				path: 'game',
				element: <EndScreen round={false}/>,
			},
		],
	},
	{
		path: '/',
		element: <TitleScreen/>,
	},
	{
		path: '*',
		element: <Navigate to={'/'} replace/>,
	},
];

export default function App(): JSX.Element {
	dayjs.extend(utc);
	const queryClient = new QueryClient();
	return <QueryClientProvider client={queryClient}>
		<ReactQueryDevtools/>
		<GameProvider>
			<MantineApp/>
		</GameProvider>
	</QueryClientProvider>;
}

function MantineApp(): JSX.Element {
	const router = createBrowserRouter(routes);

	return <MantineProvider defaultColorScheme={'dark'}>
		<RouterProvider router={router}/>
	</MantineProvider>;
}
