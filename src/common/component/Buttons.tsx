import {JSX} from 'react';
import {Button, ButtonProps, PolymorphicComponentProps} from '@mantine/core';
import {LinkProps} from 'react-router';

type ButtonsProps = PolymorphicComponentProps<'button', ButtonProps> & { component?: any, to?: LinkProps['to'] };

export function JoinButton(props: Readonly<Omit<ButtonsProps, 'variant' | 'gradient'>>): JSX.Element {
	return <Button variant={'gradient'} gradient={{from: 'teal', to: 'indigo', deg: 90}} {...props}/>;
}

export function HostButton(props: Readonly<Omit<ButtonsProps, 'variant' | 'gradient'>>): JSX.Element {
	return <Button variant={'gradient'} gradient={{from: 'grape', to: 'indigo', deg: 90}} {...props}/>;
}
