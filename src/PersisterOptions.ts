import { Store } from 'vuex'

export type GetSavedStateUnion<State> = null | State

export interface PersisterOptions<State> {
    key?: string,
    statesToPersist?: string[],
    overwrite?: boolean,
    storage?: Storage,
    persist?: (store: Store<State>) => void
    getState?: (key: string, storage: Storage) => GetSavedStateUnion<State>
    saveState?: (key: string, state: State, storage: Storage) => void
    reducer?: (statesToPersist: string[], state: State) => any
}

export interface GetSavedState<State> {
    (key: string, storage: Storage): GetSavedStateUnion<State>
}

export interface RehydrateState<State> {
    (overwrite: boolean, store: Store<State>, key: string, storage: Storage): void
}

export interface SaveState<State> {
    (key: string, state: State, storage: Storage): void
}
