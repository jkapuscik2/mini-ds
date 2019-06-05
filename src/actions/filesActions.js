import {FETCH_FILES, FETCHED_FILES} from "../actionTypes";

export const fetchFiles = (fbInstance) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_FILES,
        })

        fbInstance.fetchFiles(fbInstance).onSnapshot(snapshot => {
                if (snapshot.size) {
                    let items = [];
                    snapshot.forEach(doc =>
                        items.push({...doc.data(), uid: doc.id}),
                    );

                    dispatch(fetchedFiles(
                        items,
                        null)
                    )
                } else {
                    dispatch(fetchedFiles(
                        [],
                        null)
                    )
                }
            }
        )

    }
}

const fetchedFiles = (items, error) => {
    return {
        type: FETCHED_FILES,
        payload: {
            items: items,
            error: error
        }
    }
}
