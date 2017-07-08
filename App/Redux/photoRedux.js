import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addPhoto: ['data'],
  resetPhoto: []
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  photo: null
})

/* ------------- Reducers ------------- */

// Add photo
export const addPhoto = (state, { data }) => {
  return state.merge({
    photo: 'data:image/jpeg;base64,' + data.data
  })
}

// Reset photo
export const resetPhoto = (state) => {
  return state.merge({
    photo: null
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PHOTO]: addPhoto,
  [Types.RESET_PHOTO]: resetPhoto
})
