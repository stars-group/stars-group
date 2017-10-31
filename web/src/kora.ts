import { MemoryStore, Store as StoreBase, Kora as KoraBase } from '@ironbay/kora'

function socket() {
	switch (process.env.NODE_ENV) {
		case 'dev':
			return 'ws://localhost:12000/socket'
		case 'production':
			return `ws://${location.hostname}/socket`
	}
}

export const Store = new MemoryStore() as StoreBase
export const Kora = new KoraBase(socket(), Store)