import { UserState } from '../../types'

export const mutations = {
  SET_NAME: (state: UserState, payload: string) => {
    state.name = payload
  }
}
