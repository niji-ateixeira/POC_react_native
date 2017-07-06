import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addPost: ['post']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  posts: []
})

/* ------------- Reducers ------------- */

// Add post
export const addPost = (state, { post }) => {
  return state.merge({
    posts: [
      ...state.posts,
      post
    ]
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_POST]: addPost
})
