import { WebSocketServer } from 'ws';
import { execSync } from 'child_process';

const socket = new WebSocketServer({
	port: 12000
});

const getNowPlayingData = () => {
	return execSync('nowplaying-cli get-raw');
};

socket.on('connection', (ws) => {
	ws.send(getNowPlayingData());

	const interval = setInterval(() => ws.send(getNowPlayingData()), 1000);
	ws.on('close', () => clearInterval(interval));
});
