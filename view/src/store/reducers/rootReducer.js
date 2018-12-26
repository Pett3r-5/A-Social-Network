import loggedinReducer from './loggedinReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  loggedin: loggedinReducer,
  users: usersReducer
})

export default rootReducer
