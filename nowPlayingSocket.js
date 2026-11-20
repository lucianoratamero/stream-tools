import { WebSocketServer } from 'ws';
import { execFileSync, execSync } from 'child_process';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const socket = new WebSocketServer({
	port: 12000
});

const SEPARATOR = '\x1f';

const getMacNowPlaying = () => {
	const info = JSON.parse(execSync('nowplaying-cli get-raw', { encoding: 'utf8' }));
	if (
		!info.kMRMediaRemoteNowPlayingInfoTitle ||
		info.kMRMediaRemoteNowPlayingInfoPlaybackRate === 0
	)
		return null;

	const artwork = info.kMRMediaRemoteNowPlayingInfoArtworkData;
	const mimeType = info.kMRMediaRemoteNowPlayingInfoArtworkMIMEType ?? 'image/jpeg';

	return {
		track: info.kMRMediaRemoteNowPlayingInfoTitle,
		artist: info.kMRMediaRemoteNowPlayingInfoArtist ?? '',
		image: artwork && `data:${mimeType};base64,${artwork}`
	};
};

const getLinuxImage = async (url) => {
	if (!url.startsWith('file://')) return url;

	try {
		return `data:image/jpeg;base64,${(await readFile(fileURLToPath(url))).toString('base64')}`;
	} catch {}
};

const getLinuxNowPlaying = async () => {
	let output;
	try {
		output = execFileSync(
			'playerctl',
			[
				'metadata',
				'--format',
				['{{status}}', '{{title}}', '{{artist}}', '{{mpris:artUrl}}'].join(SEPARATOR)
			],
			{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
		);
	} catch {
		return null;
	}

	const [status, track, artist, artUrl] = output.trimEnd().split(SEPARATOR);
	if (!track || status !== 'Playing') return null;

	return { track, artist, image: await getLinuxImage(artUrl) };
};

const getNowPlaying = process.platform === 'linux' ? getLinuxNowPlaying : getMacNowPlaying;

socket.on('connection', (ws) => {
	const send = async () => ws.send(JSON.stringify(await getNowPlaying()));
	send();

	const interval = setInterval(send, 1000);
	ws.on('close', () => clearInterval(interval));
});
