import { createApp } from 'vue'
import { RootState } from './types'
import Vuex, { createStore } from 'vuex'
import VuexPersister from '../src'

// @ts-ignore
createApp({}).use(Vuex)

const vuexPersister = new VuexPersister<RootState>()

const store = createStore<RootState>({
  state: {
    count: 0
  },
  mutations: {
    INCREMENT_COUNT: state => {
      state.count++
    }
  },
  plugins: [vuexPersister.persist]
})

describe('Default storage -> LocalStorage', () => {
  it('Should persist state', () => {
    store.commit('INCREMENT_COUNT')
    const PERSISTED_STORE: RootState = JSON.parse(vuexPersister.storage.getItem('vuex') as string)

    expect(store.state.count).toBe(1)
    expect(PERSISTED_STORE.count).toBe(1)
  })
})
