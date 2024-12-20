import simon from './people/simon.jpg';
import tim from './people/tim.jpg';
import alina from './people/alina.jpg';
import stephan from './people/stephan.jpg';
import konsi from './people/konsi.jpg';
import selina from './people/selina.jpg';
import giuliano from './people/giuliano.jpg';
import niko from './people/niko.jpg';
import jonte from './people/jonte.jpg';
import yasmin from './people/yasmin.jpg';
import lea from './people/lea.jpg';

export type Player = {
	name: string;
	avatar: string;
}

export const players: Player[] = [
	{
		name: 'Alina',
		avatar: alina,
	},
	{
		name: 'Giuliano',
		avatar: giuliano,
	},
	{
		name: 'Jonte',
		avatar: jonte,
	},
	{
		name: 'Konsi',
		avatar: konsi,
	},
	{
		name: 'Lea',
		avatar: lea,
	},
	{
		name: 'Niko',
		avatar: niko,
	},
	{
		name: 'Selina',
		avatar: selina,
	},
	{
		name: 'Simon',
		avatar: simon,
	},
	{
		name: 'Stephan',
		avatar: stephan,
	},
	{
		name: 'Tim',
		avatar: tim,
	},
	{
		name: 'Yasmin',
		avatar: yasmin,
	},
];

export function getPlayer(name: string): Player | undefined {
	return players.find((player) => player.name === name);
}
