import { RootState } from './types'
import { createStore } from 'vuex'
import VuexPersister from '../src'
import { state } from './store/state'
import { mutations } from './store/mutations'

const vuexPersister = new VuexPersister<RootState>({
  storage: sessionStorage
})

const store = createStore<RootState>({
  state,
  mutations,
  plugins: [vuexPersister.persist]
})

describe('Custom storage -> sessionStorage', () => {
  it('Should persist state', () => {
    store.commit('INCREMENT_COUNT')
    const PERSISTED_STORE: RootState = JSON.parse(vuexPersister.storage.getItem('vuex') as string)

    expect(store.state.count).toBe(1)
    expect(PERSISTED_STORE.count).toBe(1)
  })
})
