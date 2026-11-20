export type WebSocketState =
	| {
			state: any | undefined;
			socket: WebSocket;
	  }
	| undefined;

export default (url: string) => {
	const connect = () => {
		const socket = new WebSocket(url);

		socket.addEventListener('close', () => {
			websocketState!.state = undefined;
			setTimeout(() => (websocketState!.socket = connect()), 3000);
		});

		socket.addEventListener('message', async (message) => {
			websocketState!.state = JSON.parse(await new Response(message.data).text());
		});

		return socket;
	};

	const websocketState: WebSocketState = $state({
		state: undefined,
		socket: connect()
	});

	return websocketState;
};
