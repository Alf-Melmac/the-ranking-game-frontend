import {JSX} from 'react';
import {Skeleton, Stack, Text, Title} from '@mantine/core';
import {QuestionDto} from '../../3_question/QuestionContext';

type QuestionProps = {
	question: QuestionDto | undefined;
};

export function Question({question}: Readonly<QuestionProps>): JSX.Element {
	return question ?
		<Stack align={'center'} gap={4}>
			<Title order={1}>{question.title}</Title>
			<Text c={'dimmed'}>{question.description}</Text>
		</Stack> :
		<Stack align={'center'} gap={4}>
			<Skeleton><Title order={1}>Die Frage</Title></Skeleton>
			<Skeleton><Text>Die schöne Beschreibung dazu</Text></Skeleton>
		</Stack>;
}
