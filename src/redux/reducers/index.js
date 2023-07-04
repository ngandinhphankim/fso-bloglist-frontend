import { combineReducers } from 'redux'
import notification from './notification'
import blog from './blog'

export default combineReducers({ notification, blog })