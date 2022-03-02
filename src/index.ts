import { Store, MutationPayload } from 'vuex'
import { SaveState } from './PersistorOptions'

export const VuexPersistor = <State>(store: Store<State>) : void => {
  const storage: Storage = window.localStorage
  const key: string = 'vuex'

  // called when the store is initialized
  store.subscribe((mutation: MutationPayload, state: State) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    saveState(key, state, storage)
  })

  const saveState: SaveState<State> = (key: string, state: State, storage: Storage) => {
    storage.setItem(key, JSON.stringify(state))
  }
}
