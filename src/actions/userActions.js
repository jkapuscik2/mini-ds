import {AUTH_USER} from "../actionTypes"

export const authUser = (user) => {
    return {
        type: AUTH_USER,
        payload: {
            "auth": user
        }
    }
}
