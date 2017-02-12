import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'

import counter from './counter'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  counter
})
