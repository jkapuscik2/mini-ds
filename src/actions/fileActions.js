import {ADD_FILE, ADDING_FILE, ADDED_FILE, RESET_FILE, REMOVED_FILE} from "../actionTypes";

const formatBytes = (bytes) => {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i))) + ' ' + sizes[i];
}

const ALLOWED_FILE_TYPE = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4', 'video/webm']
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const VALIDATION_ERROR = `Wrong file type. Only files under ${formatBytes(MAX_FILE_SIZE)} are accepted and of following types: ${ALLOWED_FILE_TYPE.map((type) => (type))}`
const SUCCESS_MSG = "File was uploaded correctly"

const validate = (type, size) => {
    return ALLOWED_FILE_TYPE.includes(type) && size < MAX_FILE_SIZE;
}

export const addFile = (file, fbInstance) => {
    return (dispatch) => {
        if (validate(file.type, file.size)) {
            dispatch({
                type: ADD_FILE
            })

            const uploadTask = fbInstance.addFile(file)

            uploadTask.on('state_changed', function (snapshot) {
                dispatch({
                    type: ADDING_FILE,
                    payload: {
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    }
                })
            }, (error) => {
                dispatch({
                    type: ADDED_FILE,
                    payload: {
                        error: error.message
                    }
                })
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    fbInstance.saveFileInfo(downloadURL, uploadTask.snapshot.ref.fullPath, file.type).then(() => {
                        dispatch({
                            type: ADDED_FILE,
                            payload: {
                                success: SUCCESS_MSG
                            }
                        })
                    }).catch((error) => {
                        dispatch({
                            type: ADDED_FILE,
                            payload: {
                                error: error.message
                            }
                        })
                    })
                });
            });
        } else {
            dispatch({
                type: ADDED_FILE,
                payload: {
                    error: VALIDATION_ERROR
                }
            })
        }
    }
}

export const resetFile = () => {
    return {
        type: RESET_FILE
    }
}

const REMOVE_SUCCESS_MSG = "File was removed"

export const removeFile = (file, fbInstance) => {
    return (dispatch) => {
        fbInstance.removeFileRef(file.uid).then(() => {
            fbInstance.removeFile(file.path).then(() => {
                dispatch({
                    type: REMOVED_FILE,
                    payload: {
                        error: null,
                        success: REMOVE_SUCCESS_MSG
                    }
                })
            }).catch((error) => {
                dispatch(errorMsg(error.message))
            })
        }).catch((error) => {
            dispatch(errorMsg(error.message))
        })
    }
}

const errorMsg = (message) => {
    return {
        type: REMOVED_FILE,
        payload: {
            error: message
        }
    }
}