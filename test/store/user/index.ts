import { Module } from 'vuex'
import { RootState, UserState } from '../../types'
import { mutations } from './mutations'

const state: UserState = {
  name: ''
}

export const user: Module<UserState, RootState> = {
  state,
  mutations
}
