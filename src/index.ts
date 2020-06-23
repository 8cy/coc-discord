import { workspace } from 'coc.nvim';
import { Client } from 'discord-rpc';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

const clientId = '724898679726538824';

const setActivity = (client: Client, startTimestamp: number) => {
	const details = pipe(
	O.fromNullable(workspace.uri),
		O.filter((x) => x.startsWith('file:///')),
		O.map((x) => x.substr(8)),
		O.map((x) => x.split('/')),
		O.filter((xs) => xs.length > 0),
		O.map((xs) => xs.reverse()[0]),
		O.map((x) => `Editing ${x}`),
		O.toUndefined,
	);
	
	const state = pipe(
		O.fromNullable(workspace.workspaceFolder.name),
        O.map((x) => x.split('/')),
        O.filter((xs) => xs.length > 0),
        O.map((xs) => xs.reverse()[0]),
        O.map((x) => `Workspace: ${x}`),
        O.toUndefined,
    );

    const largeImageKey = 'neovim';
    const largeImageText = 'Neovim';

  	client.setActivity({ state, details, startTimestamp, instance: false, largeImageKey, largeImageText });
};

const activate = () => {
  	const discordRpcClient = new Client({ transport: 'ipc' });

	discordRpcClient.connect(clientId);
	// eslint-disable-next-line no-console
	discordRpcClient.login({ clientId }).catch(() => console.warn('Could not connect coc-discord client to Discord.'));
	// TODO Add output channel

	const startTimestamp = Date.now();

	discordRpcClient.on('ready', () => {
		setActivity(discordRpcClient, startTimestamp);
		setInterval(() => setActivity(discordRpcClient, startTimestamp), 10000);
	});
};

export { activate };
