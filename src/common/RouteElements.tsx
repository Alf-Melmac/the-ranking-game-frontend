import {Container, Stack} from '@mantine/core';
import {JSX} from 'react';
import {GameTitle} from './component/GameTitle';
import {Outlet} from 'react-router';
import {QuestionProvider, useQuestionContext} from '../3_question/QuestionContext';
import {Question} from './component/Question';

export function TitlePage(): JSX.Element {
	return <Container>
		<Stack gap={'xl'} mx={'xl'} my={'md'} align={'center'}>
			<GameTitle/>
			<Outlet/>
		</Stack>
	</Container>;
}

export function QuestionPage(): JSX.Element {
	return <Stack mx={'xl'} my={'md'} align={'center'}>
		<QuestionProvider>
			<QuestionPageContent/>
		</QuestionProvider>
	</Stack>;
}

function QuestionPageContent(): JSX.Element {
	const {question} = useQuestionContext();
	return <>
		<Question question={question}/>
		<Outlet/>
	</>;
}
