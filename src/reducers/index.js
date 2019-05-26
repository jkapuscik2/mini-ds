import {combineReducers} from 'redux'
import user from './user'
import devices from './devices'

const reducer = combineReducers({
    user: user,
    devices: devices
})

export default reducer