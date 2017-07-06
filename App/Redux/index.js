import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    postStore: require('./postRedux').reducer,
    photoStore: require('./photoRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
