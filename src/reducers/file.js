import {ADD_FILE, ADDING_FILE, ADDED_FILE, RESET_FILE, REMOVED_FILE} from "../actionTypes"

const INITIAL_STATE = {
    inProgress: false,
    progress: 0,
    error: null,
    success: false
}

const file = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_FILE: {
            return {
                ...state,
                inProgress: true,
                progress: 0,
                error: null,
                success: false
            }
        }
        case ADDING_FILE: {
            return {
                ...state,
                inProgress: true,
                progress: action.payload.progress
            }
        }
        case ADDED_FILE: {
            return {
                ...state,
                inProgress: false,
                success: action.payload.success,
                error: action.payload.error
            }
        }
        case RESET_FILE: {
            return {
                ...state,
                ...INITIAL_STATE
            }
        }
        case REMOVED_FILE: {
            return {
                ...state,
                inProgress: false,
                success: action.payload.success,
                error: action.payload.error
            }
        }
        default:
            return state
    }
}

export default file