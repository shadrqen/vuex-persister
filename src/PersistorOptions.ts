import { Store } from 'vuex'

export interface PersistorOptions<State> {
    key?: string,
    storage?: Storage,
    plugin?: (store: Store<State>) => void
    saveState?: (key: string, state: State, storage: Storage) => void
}
