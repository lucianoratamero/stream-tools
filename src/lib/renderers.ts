export type Node =
	| {
			type: 'circle';
			opacity: number;
			size: number;
			position: { top: number; left: number };
			color?: string;
	  }
	| {
			type: 'svg';
			src: string;
			opacity: number;
			size: number;
			position: { top: number; left: number };
	  };

const getColor = (node: Node) => {
	if (node.type !== 'circle' || !node.color) return '0, 0, 0, 0';
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(node.color) || [];
	return (
		String(parseInt(result[1] || '0', 16)) +
		', ' +
		String(parseInt(result[2], 16)) +
		', ' +
		String(parseInt(result[3], 16)) +
		', ' +
		node.opacity
	);
};

export const emptyNode = {
	circle: (colorPalette: string[]): Node => ({
		type: 'circle',
		size: 1,
		opacity: 1,
		color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
		position: {
			top: Math.random() * window.innerHeight - 0.5,
			left: Math.random() * window.innerWidth - 0.5
		}
	}),
	svg: (src: string): Node => ({
		type: 'svg',
		src,
		size: 1,
		opacity: 1,
		position: {
			top: Math.random() * window.innerHeight - 0.5,
			left: Math.random() * window.innerWidth - 0.5
		}
	})
};

export const renderFunctions = {
	circle: ({
		node,
		context,
		decay
	}: {
		node: Node;
		context: CanvasRenderingContext2D;
		decay: number;
	}) => {
		context.fillStyle = `rgba(${getColor(node)})`;
		context.beginPath();
		context.arc(node.position.left, node.position.top, node.size, 0, 2 * Math.PI);
		context.fill();
		context.closePath();

		node.size = node.size + (window.innerWidth / window.innerHeight) * decay;
		node.opacity = 1 - (node.size * decay) / 200;
		return node;
	},
	svg: ({
		node,
		context,
		decay
	}: {
		node: Node;
		context: CanvasRenderingContext2D;
		decay: number;
	}) => {
		if (!('src' in node)) return node;

		const img = new Image();
		img.src = `data:image/svg+xml;charset=utf-8,${node.src}`;
		context.globalAlpha = node.opacity;
		context.drawImage(img, node.position.left, node.position.top, node.size, node.size);

		node.size = node.size + (window.innerWidth / window.innerHeight) * decay;
		node.opacity = 1 - (node.size * decay) / 200;
		return node;
	}
};
