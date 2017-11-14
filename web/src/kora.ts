import { MemoryStore, Store as StoreBase, Kora as KoraBase } from '@ironbay/kora'

function socket() {
	switch (process.env.NODE_ENV) {
		case 'dev':
			return 'ws://localhost:12000/socket'
		case 'production':
			return `wss://${location.hostname}/socket`
	}
}

export const Store = new MemoryStore() as StoreBase
export const Kora = new KoraBase(socket(), Store)

Store.intercept(['connection'], async mut => {
	if (mut.merge['status'] !== 'ready') return
	try {
		const token = localStorage.getItem('token')
		if (!token)
			throw 'No token'
		const result = await Kora.send('auth.upgrade', {
			token: token,
		}) as string
		Store.put(['me', 'key'], result)
		await Kora.send('kora.subscribe')
	} catch (ex) {
		Store.put(['me', 'key'], false)
	}
})

Store.intercept(['me'], data => {
	const key = data.merge['key']
	if (!key) return
	Kora.query({
		'user:info': {
			[key]: {}
		}
	})
})

Store.intercept(['user:info', '+'], data => {
	const address = data.merge['address']
	if (!address) return
	Kora.query_path(['token:balance', address])
})

// Store.intercept(['user:info', '+'], (data, path) => {
// 	const key = path[1]
// 	if (Store.get(['me', 'key']) === key)
// 		Store.put(['me', 'info'], data.merge)
// })