import {JSX} from 'react';
import classes from './FancySpinner.module.css';

export function FancySpinner(): JSX.Element {
	return <div className={classes.outer}>
		<div className={classes.infinityChrome}>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div className={classes.infinity}>
			<div><span></span></div>
			<div><span></span></div>
			<div><span></span></div>
		</div>
	</div>;
}
