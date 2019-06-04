import {FETCH_FILES, FETCHED_FILES} from "../actionTypes"

const INITIAL_STATE = {
    items: [],
    inProgress: false,
    error: null
}

const files = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_FILES: {
            return {
                ...state,
                inProgress: true
            }
        }
        case FETCHED_FILES: {
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

export default files