var Config = {

	app: {
		name: 'Trible'
	},

	cache: {
		enabled: true,
		expiry: 2000 // 2000 seconds
	},

	server: {
		cookieSecret: 'xxxxsecretxxxx',
		listenPort: 3001
	},

	lastfm: {
		api_key: 'xxxx',
		secret: 'xxxx',
		useragent: 'Choon!'
	}
}

module.exports = Config;