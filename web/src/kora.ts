import { MemoryStore, Store as StoreBase, Kora as KoraBase } from '@ironbay/kora'

export const Store = new MemoryStore() as StoreBase
export const Kora = new KoraBase('ws://localhost:12000/socket', Store)