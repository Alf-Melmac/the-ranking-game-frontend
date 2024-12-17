export type Player = {
	name: string;
	avatar: string;
}

export const players: Player[] = [
	{
		name: 'Alina',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
	},
	{
		name: 'Giuliano',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
	},
	{
		name: 'Jonte',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
	},
	{
		name: 'Konsi',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
	},
	{
		name: 'Lea',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
	},
	{
		name: 'Niko',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
	},
	{
		name: 'Selina',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
	},
	{
		name: 'Simon',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
	},
	{
		name: 'Stephan',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
	},
	{
		name: 'Tim',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
	},
	{
		name: 'Yasmin',
		avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
	},
];

export function getPlayer(name: string): Player | undefined {
	return players.find((player) => player.name === name);
}
