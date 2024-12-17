import {JSX} from 'react';
import {Navigate, useParams} from 'react-router';

export function JoinWithCode(): JSX.Element {
	const {id} = useParams<{ id: string }>();

	return <Navigate to={'/join'} state={{code: id}}/>;
}
