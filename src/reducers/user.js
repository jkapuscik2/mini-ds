import {AUTH_USER} from "../actionTypes"

const INITIAL_STATE = {
    auth: null,
}

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER: {
            return {
                ...state,
                auth: action.payload.auth,
            }
        }
        default:
            return state
    }
}

export default user