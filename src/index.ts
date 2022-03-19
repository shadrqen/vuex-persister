import merge from 'deepmerge'
import { Store, MutationPayload, Plugin } from 'vuex'
import { PersisterOptions, GetSavedState, GetSavedStateUnion, SaveState, RehydrateState } from './PersisterOptions'

/**
 * The main vuex persister class
 */
export default class VuexPersister<State> implements PersisterOptions<State> {
  key: string
  statesToPersist: string[]
  persist: Plugin<State>
  storage: Storage
  overwrite: boolean
  getState: (key: string, storage: Storage) => GetSavedStateUnion<State>
  saveState: (key: string, state: State, storage: Storage) => void
  reducer: (statesToPersist: string[], state: State) => any

  constructor (options?: PersisterOptions<State>) {
    this.key = options?.key ?? 'vuex'
    this.statesToPersist = options?.statesToPersist ?? []
    this.overwrite = options?.overwrite ?? false
    this.storage = options?.storage ?? (window?.localStorage ?? localStorage)
    this.getState = options?.getState ?? this.getSavedState
    this.saveState = options?.saveState ?? this.saveCurrentState
    this.reducer = options?.reducer ?? this.stateReducer
    this.persist = (store: Store<State>) : void => {
      this.rehydrateState(this.overwrite, store, this.key, this.storage)
      this.subscriber(store)((mutation: MutationPayload, state: State) => {
        this.saveState(this.key, this.reducer(this.statesToPersist, state), this.storage)
      })
    }
  }

  /**
   * Rehydrates the state whenever there is a saved state
   * @param {boolean} overwrite - Whether to overwrite existing state or not
   * @param {Store} store - The store instance
   * @param {string} key - The storage key
   * @param {Storage} storage - The storage instance
   * @return {void}
   */
  rehydrateState: RehydrateState<State> = (overwrite: boolean, store: Store<State>, key: string, storage: Storage) : void => {
    const SAVED_STATE = this.getSavedState(key, storage)
    if (SAVED_STATE) {
      store.replaceState(this.overwrite
        ? SAVED_STATE
        : merge(store.state, SAVED_STATE, {
          arrayMerge: (store: any, saved: GetSavedStateUnion<any>) => saved
        })
      )
    }
  }

  /**
   * Saves the state on the storage
   * @param {string} key - The storage key
   * @param {State} state - The state to save
   * @param {Storage} storage - The storage to which to save the state
   * @returns {void}
   */
  private saveCurrentState: SaveState<State> = (key: string, state: State, storage: Storage) : void => {
    storage.setItem(key, JSON.stringify(state))
  }

  /**
   * Gets the saved state
   * @param {string} key - The storage key
   * @param {Storage} storage - The storage to which to save the state
   * @returns {object|undefined} - The saved state
   */
  private getSavedState: GetSavedState<State> = (key: string, storage: Storage) : GetSavedStateUnion<State> => {
    const STATE_VALUE = storage.getItem(key)
    try {
      let STATE: GetSavedStateUnion<State>
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
   * Returns the state to persist based on specified states to be persisted
   * @param statesToPersist - An array of states to be persisted
   * @param state - The existing state
   * @returns {State} - The state to be persisted
   */
  private stateReducer = (statesToPersist: string[], state: State) => statesToPersist.length > 0
    ? statesToPersist.length === 1
      ? this.reducedStatePair(statesToPersist[0], state)
      : statesToPersist.reduce((prev: string, curr: string) => merge(this.reducedStatePair(prev, state),
        this.reducedStatePair(curr, state)) as any)
    : state

  /**
   * Creates a key-value pair of state objects, based on the specified states to save
   * @param stateKey - The specified key in the state that needs to be persisted
   * @param state - The existing state
   * @return {object} - The state key-value pair that will be persisted
   */
  private reducedStatePair = (stateKey: string, state: State) => {
    return { [this.reducedStateKey(stateKey)]: this.reducedStateValue(stateKey, state) }
  }

  /**
   * Returns the key for the state to be persisted
   * @param targetState - Target state to be persisted
   * @return {string} -The state key (to be persisted)
   */
  private reducedStateKey = (targetState: string): string => /\./.test(targetState)
    ? targetState.split('.')[0]
    : targetState

  /**
   * Returns the value for the state key to be persisted
   * @param targetState - Target state to be persisted
   * @param state - Existing state
   * @return {any} - The state value to be persisted
   */
  private reducedStateValue = (targetState: string, state: any): any => {
    if (/\./.test(targetState)) {
      const splitPathModule: string[] = targetState.split('.')
      return { [splitPathModule[1]]: state[splitPathModule[0]][splitPathModule[1]] }
    } else {
      return state[targetState]
    }
  }

  /**
   * Exposes hooks for each mutation - called after every mutation
   * @param {object} store - The store instance
   * @returns {function} - The store.subscribe function that is called after every mutation
   */
  private subscriber = (store: Store<State>) => (handler: (mutation: MutationPayload, state: State) => any) => store.subscribe(handler)
}
