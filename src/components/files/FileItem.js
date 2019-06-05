import React from "react"
import {compose} from "recompose";
import {removeFile} from "../../actions/fileActions";
import {connect} from "react-redux";
import ImgPreview from "./ImgPreview";
import VideoPreview from "./VideoPreview";
import {withFirebase} from "../firebase";

const IMG_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
const VIDEO_TYPES = ['video/mp4', 'video/webm']

class FileItem extends React.Component {

    onRemove = () => {
        this.props.removeFile(this.props.file, this.props.firebase)
    }

    render = () => {
        let content = null;

        if (IMG_TYPES.includes(this.props.file.type)) {
            content = <ImgPreview file={this.props.file}/>
        } else if (VIDEO_TYPES.includes(this.props.file.type)) {
            content = <VideoPreview file={this.props.file}/>
        } else {
            throw new Error("Unsupported file type encountered");
        }

        return (
            <div className='col-12 col-xl-3 mt-4 mb-4'>
                <div className='border border-dark d-flex flex-wrap align-items-center' style={{height: '100%'}}>
                    <i className="remove-file fas fa-trash-alt" onClick={this.onRemove}></i>
                    {content}
                </div>
            </div>
        )
    }
}

const mapActionsToDispatch = (dispatch) => {
    return {
        removeFile: (file, fbInstance) => dispatch(removeFile(file, fbInstance))
    }
}

export default compose(
    connect(null, mapActionsToDispatch),
    withFirebase
)(FileItem)