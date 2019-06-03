import {ADD_FILE} from "../actionTypes";

const ALLOWED_FILE_TYPE = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4', 'video/webm']
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const VALIDATION_ERROR = `Wrong file type. Only following files are accepted: ${ALLOWED_FILE_TYPE.map((type) => (type))}`
const SUCCESS_MSG = "File was uploaded correctly"

const validate = (type, size) => {
    return ALLOWED_FILE_TYPE.includes(type) && size < MAX_FILE_SIZE;
}

export const addFile = (file, userUid, fbInstance) => {
    return (dispatch) => {
        if (validate(file.type, file.size)) {
            dispatch({
                type: ADD_FILE,
                payload: {
                    inProgress: true,
                    progress: 0,
                    error: null
                }
            })

            const uploadTask = fbInstance.addFile(file, userUid)

            uploadTask.on('state_changed', function (snapshot) {
                dispatch({
                    type: ADD_FILE,
                    payload: {
                        inProgress: true,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                        error: null
                    }
                })
            }, (error) => {
                dispatch({
                    type: ADD_FILE,
                    payload: {
                        inProgress: false,
                        error: error.message
                    }
                })
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    fbInstance.saveFileInfo(userUid, downloadURL, file.type).then(() => {
                        dispatch({
                            type: ADD_FILE,
                            payload: {
                                inProgress: false,
                                progress: 0,
                                error: null,
                                success: SUCCESS_MSG
                            }
                        })
                    }).catch((error) => {
                        dispatch({
                            type: ADD_FILE,
                            payload: {
                                inProgress: false,
                                error: error.message
                            }
                        })
                    })
                });
            });
        } else {
            dispatch({
                type: ADD_FILE,
                payload: {
                    inProgress: false,
                    progress: 0,
                    error: VALIDATION_ERROR
                }
            })
        }
    }
}
