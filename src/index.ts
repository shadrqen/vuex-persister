import { Store } from 'vuex'
import { PersistorOptions } from './PersistorOptions'

export class VuexPersistor<State> implements PersistorOptions {
    public key: string
    public store: Store<State>

    constructor (store: Store<State>) {
      this.key = 'vuex'
      this.store = store
      console.log(this.store)
    }

    public saveState (key: string, state: {}, storage: Storage): void {
      console.log(key, state, storage)
    }
}
