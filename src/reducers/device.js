import {FETCH_DEVICE, FETCHED_DEVICE, RESET_DEVICE} from "../actionTypes"

const INITIAL_STATE = {
    device: [],
    inProgress: false,
    error: null
}

const device = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DEVICE: {
            return {
                ...state,
                inProgress: true
            }
        }
        case FETCHED_DEVICE: {
            return {
                ...state,
                inProgress: false,
                data: action.payload.data,
                error: action.payload.error
            }
        }
        case RESET_DEVICE: {
            return {
                ...state,
                ...INITIAL_STATE
            }
        }
        default:
            return state
    }
}

export default device