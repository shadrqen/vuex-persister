import { Store, MutationPayload, Plugin } from 'vuex'
import { PersistorOptions } from './PersistorOptions'

/**
 * The main vuex persistor class
 */
export class VuexPersistor<State> implements PersistorOptions<State> {
    key: string
    plugin: Plugin<State>
    storage: Storage

    constructor (options?: PersistorOptions<State>) {
      this.key = options && options.key ? options.key : 'vuex'
      this.storage = options && options.storage ? options.storage : window.localStorage
      this.plugin = (store: Store<State>) : void => {
        this.subscribe(store)((mutation: MutationPayload, state: State) => {
          this.saveState(this.key, state, this.storage)
        })
      }
    }

    /**
     * Saves the state on the storage
     * @param {string} key - The storage key
     * @param {State} state - The state to save
     * @param {Storage} storage - The storage to which to save the state
     * @returns {void}
     */
    saveState (key: string, state: State, storage: Storage): void {
      storage.setItem(key, JSON.stringify(state))
    }

    /**
     * Exposes hooks for each mutation - called after every mutation
     * @param {object} store - The store instance
     * @returns {function} - The store.subscribe function that is called after every mutation
     */
    private subscribe = (store: Store<State>) => (handler: (mutation: MutationPayload, state: State) => any) => store.subscribe(handler)
}
