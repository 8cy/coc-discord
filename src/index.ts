/* eslint-disable */

import { workspace } from 'coc.nvim';
import { Client } from 'discord-rpc';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import config from './config.json';

const clientId = config.clientId; // 724898679726538824

const setActivity = (client: Client, startTimestamp: number) => {
	const details = pipe(
	    O.fromNullable(workspace.uri),
		O.filter((x) => x.startsWith('file:///')),
		O.map((x) => x.substr(8)),
		O.map((x) => x.split('/')),
		O.filter((xs) => xs.length > 0),
		O.map((xs) => xs.reverse()[0]),
		O.map((x) => `${config.RPC.detailsPreAppend} ${x}`), // O.map((x) => `Editing ${x}`),
		O.toUndefined,
	);

	const state = pipe(
		O.fromNullable(workspace.workspaceFolder.name),
        O.map((x) => x.split('/')),
        O.filter((xs) => xs.length > 0),
        O.map((xs) => xs.reverse()[0]),
        O.map((x) => `${config.RPC.statePreAppend} ${x}`), // O.map((x) => `Workspace: ${x}`),
        O.toUndefined,
    );

    const fileExtension = pipe(
        O.fromNullable(workspace.uri),
		O.filter((x) => x.startsWith('file:///')),
		O.map((x) => x.substr(8)),
		O.map((x) => x.split('.')),
		O.filter((xs) => xs.length > 0),
		O.map((xs) => xs.reverse()[0]),
		O.map((x) => x.trim()),
		O.toUndefined,
    );

    // TODO: add custom config.json customizability for largeImageText.
    // don't really know how i would go about doing this, possibly could make a config entry for the pre-append and the suf-append
    // but that wouldn't look too nice visually
    const largeImageText = pipe(
        O.fromNullable(fileExtension.toUpperCase()),
        O.map((x) => `Editing a ${x} file`),
        O.toUndefined,
    );

    let largeImageKey: string;
    // let edgeCaseFileExts = ['h', 'hpp', 'cc', 'jsx', 'tsx', 'vimrc'];
    let validFileExts = ['c', 'cpp', 'cs', 'css', 'go', 'gradle', 'hbs', 'html', 'java', 'js', 'less', 'php', 'py', 'rb', 'sass', 'sql', 'swift', 'ts', 'vim', 'vue', ''];

    if (validFileExts.includes(fileExtension.toLowerCase())) {
        largeImageKey = fileExtension.toLowerCase();
    } else {
        switch (fileExtension.toLowerCase()) {
            case 'h': largeImageKey = 'c'; break;
            case 'hpp': largeImageKey = 'cpp'; break; // might combine hpp and cc with a && op
            case 'cc': largeImageKey = 'cpp'; break;
            case 'jsx': largeImageKey = 'js'; break;
            case 'tsx': largeImageKey = 'ts'; break;
            case 'vimrc': largeImageKey = 'vim'; break;
            case 'npmignore': largeImageKey = 'npm'; break;
            case 'scss': largeImageKey = 'sass'; break;
            case 'gitignore': largeImageKey = 'github'; break;
            default: largeImageKey = 'file'; break;
        };
    };

    const smallImageKey = config.RPC.smallImageKey; // neovim
    const smallImageText = config.RPC.smallImageText; // Neovim

  	client.setActivity({ state, details, startTimestamp, instance: false, largeImageKey, largeImageText, smallImageKey, smallImageText });
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
