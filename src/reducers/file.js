import {ADD_FILE} from "../actionTypes"

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
                inProgress: action.payload.inProgress,
                progress: action.payload.progress,
                error: action.payload.error,
                success: action.payload.success
            }
        }
        default:
            return state
    }
}

export default file