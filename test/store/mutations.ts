import { RootState } from '../types'

export const mutations = {
  INCREMENT_COUNT: (state: RootState) => {
    state.count++
  }
}
