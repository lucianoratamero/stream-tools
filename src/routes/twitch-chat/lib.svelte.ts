import { type OnMessageExtra } from 'comfy.js';
// @ts-expect-error
import tmi from 'tmi.js';

export type PronounsAPI =
	| null
	| {
			id: string;
			login: string;
			pronoun_id: string;
	  }[];

type FFZBadges = {
	room: {
		_id: number;
		twitch_id: number;
		youtube_id: string | null;
		id: string;
		is_group: boolean;
		display_name: string;
		set: number;
		moderator_badge: string | null;
		vip_badge: string | null;
		mod_urls: string | null;
		user_badges: object;
		user_badge_ids: object;
		css: string | null;
	};
	sets: {
		[key: string]: {
			id: number;
			_type: number;
			icon: string | null;
			title: string;
			css: string | null;
			emoticons: Array<any>;
		};
	};
	mod_urls: string[] | null;
	vip_badge: string[] | null;
} | null;

export let collection: {
	messages: { id: string; user: string; message: string; processed: string }[];
} = $state({
	messages: []
});

let id = $state(1);
let pronounNames: { display: string; name: string }[] = $state([]);
let SubBadges = $state({});
let FFZbadges: FFZBadges = $state(null);
let FFZchannelemoticons: Record<string, any> = $state({});
let FFZglobalemoticons: Record<string, any> = $state({});
let BTTVchannelemoticons: Record<string, any> = $state({});
let BTTVglobalemoticons: Record<string, any> = $state({});
let screen_time: number | null = $state(null);

let pronounCache: {
	name: string;
	pronounsAPI: PronounsAPI;
}[] = $state([]);
let pronounsAPI: PronounsAPI | null = $state(null);

export function init({
	channel,
	twitch_id,
	message_screen_time
}: {
	channel: string;
	twitch_id: string | null;
	message_screen_time: string | null;
}) {
	screen_time = message_screen_time ? Number(message_screen_time) : null;
	fetch('https://api.frankerfacez.com/v1/room/' + channel.toLowerCase())
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return fetch('https://api.frankerfacez.com/v1/set/' + data.room.set);
		})
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			FFZchannelemoticons = out;
		})
		.catch((err) => {
			throw err;
		});
	fetch('https://api.frankerfacez.com/v1/room/' + channel.toLowerCase())
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			FFZbadges = out.room;
		})
		.catch((err) => {
			throw err;
		});
	fetch('https://api.betterttv.net/3/cached/users/twitch/' + twitch_id)
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			BTTVchannelemoticons = out;
		})
		.catch((err) => {
			throw err;
		});
	fetch('https://api.betterttv.net/3/cached/emotes/global')
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			BTTVglobalemoticons = out;
		})
		.then(() => {
			return fetch('https://api.frankerfacez.com/v1/set/global');
		})
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			FFZglobalemoticons = out;
		})
		.catch((err) => {
			throw err;
		});
	fetch('https://pronouns.alejo.io/api/pronouns')
		.then((res) => {
			return res.json();
		})
		.then((out) => {
			pronounNames = out;
		})
		.catch((err) => {
			throw err;
		});

	//chat moderation tools
	const client = new tmi.Client({
		connection: {
			reconnect: true,
			secure: true
		},
		channels: [channel]
	});
	client.connect();

	client.on('message', (_channel: string, tags: any, message: string, _self: boolean) => {
		processPronouns(message, tags['username'], tags);
	});

	client.on('clearchat', () => {
		console.log('chat cleared');
		collection.messages = [];
	});

	client.on(
		'messagedeleted',
		(_channel: string, username: string, deletedMessage: string, _userstate: string) => {
			for (let i = 0; i < collection.messages.length; i++) {
				if (
					collection.messages[i].user.toLowerCase() == username &&
					collection.messages[i].message == deletedMessage
				) {
					collection.messages.splice(i, 1);
					console.log('message of ' + username + ' deleted');
				}
			}
		}
	);

	client.on(
		'timeout',
		(
			_channel: string,
			username: string,
			_reason: string,
			_duration: string,
			_userstate: string
		) => {
			for (let i = 0; i < collection.messages.length; i++) {
				if (collection.messages[i].user.toLowerCase() == username) {
					collection.messages.splice(i, 1);
					i = -1;
				}
			}
			console.log(username + ' timeouted');
		}
	);

	client.on('ban', (_channel: string, username: string, _reason: string, _userstate: string) => {
		for (let i = 0; i < collection.messages.length; i++) {
			if (collection.messages[i].user.toLowerCase() == username) {
				collection.messages.splice(i, 1);
				i = -1;
			}
		}
		console.log(username + ' timeouted');
	});

	//API calling
	return {
		client
	};
}

export function processPronouns(
	message: string,
	user: string,
	extra: OnMessageExtra & {
		color: OnMessageExtra['userColor'];
		badges: OnMessageExtra['userBadges'];
		emotes: OnMessageExtra['messageEmotes'];
	}
) {
	let pronounFilter = pronounCache.filter(function (x: { name: string }) {
		return x.name == user;
	});
	//check for pronouns in cache
	if (pronounFilter.length !== 0) {
		console.log('pronouns in cache');
		pronounsAPI = pronounFilter[0].pronounsAPI;
		processMessage(message, user, extra);
	} else {
		async function fetchPronouns() {
			const res = await fetch('https://pronouns.alejo.io/api/users/' + user.toLowerCase());
			pronounsAPI = await res.json();
			if (pronounsAPI?.length !== 0) {
				pronounCache.push({ name: user, pronounsAPI });
				console.log('pronouns retrived');
			} else {
				pronounCache.push({ name: user, pronounsAPI: null });
			}
			processMessage(message, user, extra);
		}

		fetchPronouns();
	}
}

function processMessage(
	message: string,
	user: string,
	extra: OnMessageExtra & {
		color: OnMessageExtra['userColor'];
		badges: OnMessageExtra['userBadges'];
		emotes: OnMessageExtra['messageEmotes'];
	}
) {
	// Looks for popular chatbots and filters them out
	if (
		user === 'StreamElements' ||
		user === 'Moobot' ||
		user === 'Nightbot' ||
		user === 'Streamlabs'
	) {
		console.log('Detected Bot');
	}
	//Getting the message to the bubble
	else {
		//Colors the username the same color as on Twitch
		let color;
		if (extra.color == null) {
			color = '#6441A4';
		} else {
			color = extra.color;
		}
		let usercolor = '<span class="username" style="color:' + color + '">' + user + '</span>';

		if (!pronounsAPI || !pronounsAPI.length) {
			console.log('No pronouns');
		} else {
			for (let i = 0; i < pronounNames.length; i++) {
				if (pronounsAPI[0].pronoun_id == pronounNames[i].name) {
					usercolor = '<span class="pronoun">' + pronounNames[i].display + '</span>' + usercolor;
					break;
				}
			}
		}
		// Adds badges to the name if enabled in config.js--
		if (!extra.badges || Object.keys(extra.badges).length === 0) {
			console.log('No user badge');
		} else {
			let values = Object.keys(extra.badges);
			// use Twitch API with badgesList, to make things future prove
			for (let i = values.length; i >= 0; i--) {
				let badgeID = values[i];
				if (badgeID == 'broadcaster') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1 " alt="badge">' +
						usercolor;
				}
				if (badgeID == 'moderator') {
					if (FFZbadges !== undefined && FFZbadges?.mod_urls) {
						usercolor = '<img src="' + FFZbadges.mod_urls[1] + '" alt="moderator">' + usercolor;
					} else {
						usercolor =
							'<img src="https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1 " alt="moderator">' +
							usercolor;
					}
				}
				if (badgeID == 'partner') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/1 ">' +
						usercolor;
				}
				if (badgeID == 'staff') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1 ">' +
						usercolor;
				}
				if (badgeID == 'founder') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/511b78a9-ab37-472f-9569-457753bbe7d3/1 ">' +
						usercolor;
				}
				if (badgeID == 'vip') {
					if (FFZbadges !== undefined && FFZbadges?.vip_badge) {
						usercolor = '<img src="https:' + FFZbadges.vip_badge[1] + '">' + usercolor;
					} else {
						usercolor =
							'<img src="https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1 ">' +
							usercolor;
					}
				}
				if (badgeID == 'premium') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1 ">' +
						usercolor;
				}
				if (badgeID == 'artist-badge') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/4300a897-03dc-4e83-8c0e-c332fee7057f/1 ">' +
						usercolor;
				}
				if (badgeID == 'no_audio') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/aef2cd08-f29b-45a1-8c12-d44d7fd5e6f0/1 ">' +
						usercolor;
				}
				if (badgeID == 'no_video') {
					usercolor =
						'<img src="https://static-cdn.jtvnw.net/badges/v1/199a0dba-58f3-494e-a7fc-1fa0a1001fb8/1 ">' +
						usercolor;
				}
				if (badgeID == 'sub-gifter') {
					let GiftAmount = ['1', '5', '10', '25', '50', '100', '250', '500', '1000'];
					let GiftedLinks = [
						'https://static-cdn.jtvnw.net/badges/v1/f1d8486f-eb2e-4553-b44f-4d614617afc1/1',
						'https://static-cdn.jtvnw.net/badges/v1/3e638e02-b765-4070-81bd-a73d1ae34965/1',
						'https://static-cdn.jtvnw.net/badges/v1/bffca343-9d7d-49b4-a1ca-90af2c6a1639/1',
						'https://static-cdn.jtvnw.net/badges/v1/17e09e26-2528-4a04-9c7f-8518348324d1/1',
						'https://static-cdn.jtvnw.net/badges/v1/47308ed4-c979-4f3f-ad20-35a8ab76d85d/1',
						'https://static-cdn.jtvnw.net/badges/v1/5056c366-7299-4b3c-a15a-a18573650bfb/1',
						'https://static-cdn.jtvnw.net/badges/v1/df25dded-df81-408e-a2d3-40d48f0d529f/1',
						'https://static-cdn.jtvnw.net/badges/v1/f440decb-7468-4bf9-8666-98ba74f6eab5/1',
						'https://static-cdn.jtvnw.net/badges/v1/b8c76744-c7e9-44be-90d0-08840a8f6e39/1'
					];
					for (let j = 0; j < GiftAmount.length; j++) {
						if (extra.badges['sub-gifter'] == GiftAmount[j]) {
							usercolor = '<img src="' + GiftedLinks[j] + '">' + usercolor;
							break;
						}
					}
				}
				if (badgeID == 'bits') {
					let BitsAmount = [
						'1',
						'100',
						'1000',
						'5000',
						'10000',
						'25000',
						'50000',
						'75000',
						'100000',
						'200000',
						'300000',
						'400000',
						'500000',
						'600000',
						'700000',
						'800000',
						'900000',
						'1000000'
					];
					let BitLinks = [
						'https://static-cdn.jtvnw.net/badges/v1/73b5c3fb-24f9-4a82-a852-2f475b59411c/1',
						'https://static-cdn.jtvnw.net/badges/v1/09d93036-e7ce-431c-9a9e-7044297133f2/1',
						'https://static-cdn.jtvnw.net/badges/v1/0d85a29e-79ad-4c63-a285-3acd2c66f2ba/1',
						'https://static-cdn.jtvnw.net/badges/v1/57cd97fc-3e9e-4c6d-9d41-60147137234e/1',
						'https://static-cdn.jtvnw.net/badges/v1/68af213b-a771-4124-b6e3-9bb6d98aa732/1',
						'https://static-cdn.jtvnw.net/badges/v1/64ca5920-c663-4bd8-bfb1-751b4caea2dd/1',
						'https://static-cdn.jtvnw.net/badges/v1/62310ba7-9916-4235-9eba-40110d67f85d/1',
						'https://static-cdn.jtvnw.net/badges/v1/ce491fa4-b24f-4f3b-b6ff-44b080202792/1',
						'https://static-cdn.jtvnw.net/badges/v1/96f0540f-aa63-49e1-a8b3-259ece3bd098/1',
						'https://static-cdn.jtvnw.net/badges/v1/4a0b90c4-e4ef-407f-84fe-36b14aebdbb6/1',
						'https://static-cdn.jtvnw.net/badges/v1/ac13372d-2e94-41d1-ae11-ecd677f69bb6/1',
						'https://static-cdn.jtvnw.net/badges/v1/a8f393af-76e6-4aa2-9dd0-7dcc1c34f036/1',
						'https://static-cdn.jtvnw.net/badges/v1/f6932b57-6a6e-4062-a770-dfbd9f4302e5/1',
						'https://static-cdn.jtvnw.net/badges/v1/4d908059-f91c-4aef-9acb-634434f4c32e/1',
						'https://static-cdn.jtvnw.net/badges/v1/a1d2a824-f216-4b9f-9642-3de8ed370957/1',
						'https://static-cdn.jtvnw.net/badges/v1/5ec2ee3e-5633-4c2a-8e77-77473fe409e6/1',
						'https://static-cdn.jtvnw.net/badges/v1/088c58c6-7c38-45ba-8f73-63ef24189b84/1',
						'https://static-cdn.jtvnw.net/badges/v1/494d1c8e-c3b2-4d88-8528-baff57c9bd3f/1'
					];
					for (let j = 0; j < BitsAmount.length; j++) {
						if (extra.badges.bits == BitsAmount[j]) {
							usercolor = '<img src="' + BitLinks[j] + '">' + usercolor;
							break;
						}
					}
				}
				if (badgeID == 'subscriber') {
					if (Object.keys(SubBadges).length != 0 && SubBadges.constructor != Object) {
						// let BadgeAge = [
						// 	'0',
						// 	'2',
						// 	'3',
						// 	'6',
						// 	'9',
						// 	'12',
						// 	'18',
						// 	'24',
						// 	'36',
						// 	'2000',
						// 	'2002',
						// 	'2003',
						// 	'2006',
						// 	'2009',
						// 	'2012',
						// 	'2018',
						// 	'2024',
						// 	'2036',
						// 	'3000',
						// 	'3002',
						// 	'3003',
						// 	'3006',
						// 	'3009',
						// 	'3012',
						// 	'3018',
						// 	'3024',
						// 	'3036'
						// ];
						usercolor =
							'<img src="https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1 ">' +
							usercolor;
					} else {
						usercolor =
							'<img src="https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1 ">' +
							usercolor;
					}
				}
			}
		}

		let emotes;
		// Converts message text into emote pictures
		if (!extra.emotes || Object.keys(extra.emotes).length === 0) {
			emotes = message;
		} else {
			let vals = Object.values(extra.emotes);
			let keys = Object.keys(extra.emotes);

			let Namote: Record<string, any> = {};
			let emotestring = '';
			let emotetext = '';

			for (let i = 0; i < keys.length; i++) {
				let emoteID = keys[i];
				let pos = vals[i];
				let string = String(pos);
				let matches = string.match(/\d+/g);
				if (matches !== null) {
					let pos1 = matches[0];
					let pos2 = matches[1];
					emotetext = message.substring(Number(pos1), parseInt(pos2, 10) + 1);
				}
				emotestring += emotetext + '|';
				Namote[emotetext] =
					'<img src="https://static-cdn.jtvnw.net/emoticons/v2/' + emoteID + '/default/dark/1.0">';
			}
			let newStr = emotestring.substring(0, emotestring.length - 1);

			function escapeRegExp(emotetext: string) {
				return emotetext.replace(/[\-\[\]\{\}\(\)\*\+\?\.\^\$]/g, '\\$&');
			}

			let emotestring2 = RegExp(escapeRegExp(newStr), 'g');
			emotes = message.replace(emotestring2, function (matched) {
				return Namote[matched];
			});
		}

		//FFZ
		if (FFZchannelemoticons['set'] !== undefined) {
			let FFZvals: { id: string; name: string }[] = Object.values(
				FFZchannelemoticons.set.emoticons
			);
			for (let i = 0; i < FFZchannelemoticons.set.emoticons.length; i++) {
				let FFZname = FFZvals[i].name;
				let re = new RegExp(`\\b${FFZname}\\b`, 'g');
				emotes = emotes.replace(
					re,
					'<img src="https://cdn.frankerfacez.com/emote/' + FFZvals[i].id + '/1">'
				);
			}
		}

		// @ts-ignore
		let FFZglobalvals = Object.values(FFZglobalemoticons.sets[3].emoticons);
		// @ts-ignore
		for (let i = 0; i < FFZglobalemoticons.sets[3].emoticons.length; i++) {
			// @ts-ignore
			let FFZname = FFZglobalvals[i].name;
			let re = new RegExp(`\\b${FFZname}\\b`, 'g');
			emotes = emotes.replace(
				re,
				// @ts-ignore
				'<img src="https://cdn.frankerfacez.com/emote/' + FFZglobalvals[i].id + '/1">'
			);
		}

		//BTTV
		if (
			BTTVchannelemoticons.channelEmotes !== undefined &&
			BTTVchannelemoticons.sharedEmotes !== undefined
		) {
			let BTTVvals = Object.values(BTTVchannelemoticons.channelEmotes);
			let BTTVsharedvals = Object.values(BTTVchannelemoticons.sharedEmotes);

			for (let i = 0; i < BTTVchannelemoticons.channelEmotes.length; i++) {
				// @ts-ignore
				let BTTVname = BTTVvals[i].code;
				let re = new RegExp(`\\b${BTTVname}\\b`, 'g');
				emotes = emotes.replace(
					re,
					// @ts-ignore
					'<img src="https://cdn.betterttv.net/emote/' + BTTVvals[i].id + '/1x">'
				);
			}
			for (let i = 0; i < BTTVchannelemoticons.sharedEmotes.length; i++) {
				// @ts-ignore
				let BTTVname = BTTVsharedvals[i].code;
				let re = new RegExp(`\\b${BTTVname}\\b`, 'g');
				emotes = emotes.replace(
					re,
					// @ts-ignore
					'<img src="https://cdn.betterttv.net/emote/' + BTTVsharedvals[i].id + '/1x">'
				);
			}
		}

		let BTTVglobalvals = Object.values(BTTVglobalemoticons);
		for (let i = 0; i < BTTVglobalemoticons.length; i++) {
			// @ts-ignore
			let BTTVname = BTTVglobalvals[i].code;
			let re = new RegExp(`\\b${BTTVname}\\b`, 'g');
			emotes = emotes.replace(
				re,
				// @ts-ignore
				'<img src="https://cdn.betterttv.net/emote/' + BTTVglobalvals[i].id + '/1x">'
			);
		}

		// Adds a the current time to the start of message and gives it to array
		let chat = `<span class="badges">${usercolor}</span><span class="separator">:</span><span class="message-content">${emotes}</span>`;

		const item = {
			id: String(id),
			user: String(user),
			message: String(message),
			processed: String(chat)
		};
		id = id + 1;
		collection.messages.push(item);

		if (screen_time) {
			setTimeout(() => {
				collection.messages = collection.messages.filter((x) => x.message !== item.message);
			}, Number(screen_time));
		}

		if (collection.messages.length > 500) {
			collection.messages.shift();
		}
	}
}
