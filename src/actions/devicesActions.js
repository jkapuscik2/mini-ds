import {FETCH_DEVICES, FETCHED_DEVICES} from "../actionTypes";

export const fetchDevices = (userUid, fbInstance) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_DEVICES
        })

        fbInstance.fetchDevices(userUid, fbInstance).onSnapshot(snapshot => {
                if (snapshot.size) {
                    let items = [];
                    snapshot.forEach(doc =>
                        items.push({...doc.data(), uid: doc.id}),
                    );

                    dispatch(fetchedDevices(
                        items,
                        null)
                    )
                } else {
                    dispatch(fetchedDevices(
                        [],
                        null)
                    )
                }
            }
        )
    }
}

export const fetchedDevices = (items, error) => {
    return {
        type: FETCHED_DEVICES,
        payload: {
            items: items,
            error: error
        }
    }
}
