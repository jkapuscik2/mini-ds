import {combineReducers} from 'redux'
import user from './user'
import device from './device'
import devices from './devices'

const reducer = combineReducers({
    user: user,
    device: device,
    devices: devices
})

export default reducer