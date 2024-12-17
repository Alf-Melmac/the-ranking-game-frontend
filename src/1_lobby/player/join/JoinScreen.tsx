import {JSX} from 'react';
import {Avatar, Button, Group, NumberInput, SimpleGrid, Stack, Title} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {useLocation, useNavigate} from 'react-router';
import apiClient, {voidFunction} from '../../../common/hook/apiClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {isInRange, isNotEmpty, useForm} from '@mantine/form';
import {Player, players} from '../../../common/constant/players';
import {useUncontrolled} from '@mantine/hooks';
import {JoinButton} from '../../../common/component/Buttons';
import {RemoveUndefined} from '../../../common/util/typeUtils';
import {useGameContext} from '../../../common/GameContext';

type JoinFormType = {
	code: number | undefined;
	player: Player | undefined;
}

type PostJoinProps = RemoveUndefined<JoinFormType>;

export function JoinScreen(): JSX.Element {
	const state = useLocation().state as { code: string } | null;

	const form = useForm<JoinFormType>({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: {
			code: state?.code ? Number(state.code) : undefined,
			player: undefined,
		},
		validate: {
			// @ts-ignore
			code: isInRange({min: 10000, max: 99999}),
			// @ts-ignore
			player: isNotEmpty(),
		},
	});

	const {setGameId} = useGameContext();
	const navigate = useNavigate();
	const postJoin = (values: PostJoinProps) => apiClient
		.put(`/game/${values.code}/join`, values.player.name, {headers: {'Content-Type': 'text/plain'}})
		.then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError, PostJoinProps>({
		mutationFn: postJoin,
		onSuccess: (_, variables) => {
			setGameId(variables.code);
			navigate('/join/waiting-room');
		},
		onError: (err) => {
			console.log('err', err);
			form.setErrors({code: 'Spiel nicht gefunden'});
		},
	});

	return <form onSubmit={form.onSubmit((values) => mutate(values as unknown as PostJoinProps))}>
		<Stack>
			<Title order={2} id={'code'}>Spielcode</Title>
			<NumberInput aria-labelledby={'code'} placeholder={'12345'} size={'xl'}
						 allowDecimal={false} hideControls min={10000} max={99999}
						 {...form.getInputProps('code')} key={form.key('code')}/>
			<Title order={2}>Wer bist du?</Title>
			<PlayerSelect {...form.getInputProps('player')} key={form.key('player')}/>
			<Group gap={4} align={'flex-end'}>
				<JoinButton size={'xl'}
							leftSection={<FontAwesomeIcon icon={faPlay}/>}
							disabled={!form.isValid()} loading={isPending} type={'submit'}
				>
					Beitreten
				</JoinButton>
			</Group>
		</Stack>
	</form>;
}

type PlayerSelectProps = {
	value?: Player;
	defaultValue?: Player;
	onChange?: (value: Player) => void;
}

function PlayerSelect({value, defaultValue, onChange}: Readonly<PlayerSelectProps>) {
	const [_value, handleChange] = useUncontrolled({
		value,
		defaultValue,
		finalValue: undefined,
		onChange,
	});

	return <SimpleGrid cols={{base: 1, xs: 2, sm: 3}}>
		{players.map((player) => <Button key={player.name}
										 variant={_value === player ? 'outline' : 'subtle'}
										 size={'xl'}
										 onClick={() => handleChange(player)}
										 leftSection={<Avatar src={player.avatar}/>}>
			{player.name}
		</Button>)}
	</SimpleGrid>;
}
