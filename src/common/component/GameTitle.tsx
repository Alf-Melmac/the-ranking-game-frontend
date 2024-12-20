import {JSX} from 'react';
import classes from './GameTitle.module.css';
import {Center, Title} from '@mantine/core';

export function GameTitle(): JSX.Element {
	return <Center component={Title} className={classes.titleText}>The Ranking Game</Center>;
}
