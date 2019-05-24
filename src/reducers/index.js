import {combineReducers} from 'redux'
import user from './user'

const reducer = combineReducers({
    user: user
})

export default reducer