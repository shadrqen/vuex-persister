import merge from 'deepmerge'
import { Store, MutationPayload, Plugin } from 'vuex'
import { PersistorOptions, GetState, GetStateUnion, SaveState, RehydrateState } from './PersistorOptions'

/**
 * The main vuex persistor class
 */
export class VuexPersistor<State> implements PersistorOptions<State> {
    key: string
    persist: Plugin<State>
    storage: Storage
    overwrite: Boolean

    constructor (options?: PersistorOptions<State>) {
      this.key = options && options.key ? options.key : 'vuex'
      this.overwrite = options && options.overwrite ? options.overwrite : false
      this.storage = options && options.storage ? options.storage : window.localStorage
      this.persist = (store: Store<State>) : void => {
        this.rehydrateState(this.overwrite, store, this.key, this.storage)
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
    saveState: SaveState<State> = (key: string, state: State, storage: Storage) : void => {
      storage.setItem(key, JSON.stringify(state))
    }

    /**
     * Rehydrates the state whenever there is a saved state
     * @param {boolean} overwrite - Whether to overwrite existing state or not
     * @param {Store} store - The store instance
     * @param {string} key - The storage key
     * @param {Storage} storage - The storage instance
     * @return {void}
     */
    rehydrateState :RehydrateState<State> = (overwrite: Boolean, store: Store<State>, key: string, storage: Storage) : void => {
      const SAVED_STATE = this.getSavedState(key, storage)
      if (SAVED_STATE) {
        store.replaceState(this.overwrite
          ? SAVED_STATE
          : merge(store.state, SAVED_STATE, {
            arrayMerge: (store, saved) => saved
          })
        )
      }
    }

    /**
     * Gets the saved state
     * @param {string} key - The storage key
     * @param {Storage} storage - The storage to which to save the state
     * @returns {object|undefined} - The saved state
     */
    getSavedState: GetState<State> = (key: string, storage: Storage) : GetStateUnion<State> => {
      const STATE_VALUE = storage.getItem(key)
      try {
        let STATE: GetStateUnion<State>
        switch (typeof STATE_VALUE) {
          case 'string':
            STATE = JSON.parse(STATE_VALUE)
            break
          case 'object':
            STATE = STATE_VALUE
            break
          default:
            STATE = null
            break
        }
        return STATE
      } catch (err) {
        return null
      }
    }

    /**
     * Exposes hooks for each mutation - called after every mutation
     * @param {object} store - The store instance
     * @returns {function} - The store.subscribe function that is called after every mutation
     */
    private subscribe = (store: Store<State>) => (handler: (mutation: MutationPayload, state: State) => any) => store.subscribe(handler)
}
