import {combineReducers} from 'redux'
import file from './file'
import files from './files'
import user from './user'
import device from './device'
import devices from './devices'

const reducer = combineReducers({
    user: user,
    device: device,
    devices: devices,
    file: file,
    files: files
})

export default reducer