import { RootState } from './types'
import { createStore } from 'vuex'
import VuexPersister from '../src'
import { state } from './store/state'
import { mutations } from './store/mutations'
import { user } from './store/user'

const vuexPersister = new VuexPersister<RootState>({
  statesToPersist: ['user.name']
})

const store = createStore<RootState>({
  state,
  mutations,
  modules: { user },
  plugins: [vuexPersister.persist]
})

describe('Reducer -> Persist specific state', () => {
  it('Should persist specified state', () => {
    store.commit('SET_NAME', 'James Bond')
    const PERSISTED_STORE: RootState = JSON.parse(vuexPersister.storage.getItem('vuex') as string)

    // @ts-ignore
    expect(store.state.user.name).toBe('James Bond')
    // @ts-ignore
    expect(PERSISTED_STORE.user.name).toBe('James Bond')
  })
  it('Should fail to persist unspecified state', () => {
    store.commit('INCREMENT_COUNT')
    const PERSISTED_STORE: RootState = JSON.parse(vuexPersister.storage.getItem('vuex') as string)

    expect(store.state.count).toBe(1)
    expect(PERSISTED_STORE.count).toBe(undefined)
  })
})
