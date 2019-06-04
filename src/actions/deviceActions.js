import {FETCH_DEVICE, FETCHED_DEVICE, RESET_DEVICE} from "../actionTypes";

const NO_DEVICE_ERROR_MSG = "Device not found"

export const fetchDevice = (deviceUid = "", fbInstance) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_DEVICE
        })

        fbInstance.fetchDevice(deviceUid, fbInstance).get()
            .then((devices) => {
                if (devices.size) {
                    const data = {...devices.docs[0].data(), uid: deviceUid}

                    dispatch(fetchedDevice(
                        data,
                        null)
                    )
                } else {
                    dispatch(fetchedDevice(
                        null,
                        NO_DEVICE_ERROR_MSG)
                    )
                }
            })
            .catch((error) => {
                dispatch(fetchedDevice(
                    null,
                    error.message)
                )
            })
    }
}

export const fetchedDevice = (data, error) => {
    return {
        type: FETCHED_DEVICE,
        payload: {
            data: data,
            error: error
        }
    }
}

export const resetDevice = () => {
    return {
        type: RESET_DEVICE
    }
}