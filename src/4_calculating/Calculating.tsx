import {JSX} from 'react';
import classes from './Calculating.module.css';
import {Center, Title} from '@mantine/core';
import {useNavigate} from 'react-router';
import {useTimeout} from '@mantine/hooks';

export function Calculating(): JSX.Element {
	const navigate = useNavigate();
	useTimeout(() => navigate('/results/question'), 4000, {autoInvoke: true});

	return <Center className={classes.content}>
		<Title size={100}>Die Ergebnisse werden berechnet...</Title>

		<ul className={classes.circles}>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</Center>;
}
