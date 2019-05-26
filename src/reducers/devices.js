import {FETCH_DEVICES, FETCHED_DEVICES} from "../actionTypes"

const INITIAL_STATE = {
    items: [],
    inProgress: false,
    error: null
}

const devices = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DEVICES: {
            return {
                ...state,
                inProgress: true
            }
        }
        case FETCHED_DEVICES: {
            return {
                ...state,
                inProgress: false,
                items: action.payload.items,
                error: action.payload.error
            }
        }
        default:
            return state
    }
}

export default devices