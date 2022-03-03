import { Store } from 'vuex'

export type GetStateUnion<State> = null | State

export interface PersistorOptions<State> {
    key?: string,
    overwrite?: Boolean,
    storage?: Storage,
    persist?: (store: Store<State>) => void
    getSavedState?: (key: string, storage: Storage) => void
    saveState?: (key: string, state: State, storage: Storage) => void
}

export interface GetState<State> {
    (key: string, storage: Storage): GetStateUnion<State>
}

export interface RehydrateState<State> {
    (overwrite: Boolean, store: Store<State>, key: string, storage: Storage): void
}

export interface SaveState<State> {
    (key: string, state: State, storage: Storage): void
}
