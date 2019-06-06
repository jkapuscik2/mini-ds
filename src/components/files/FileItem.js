import React from "react"
import {compose} from "recompose";
import {removeFile} from "../../actions/fileActions";
import {connect} from "react-redux";
import {withFirebase} from "../firebase";
import FilePreview from "./FilePreview";


class FileItem extends React.Component {

    onRemove = () => {
        this.props.removeFile(this.props.file, this.props.firebase)
    }

    render = () => {
        return (
            <div className='col-12 col-xl-3 mt-4 mb-4'>
                <div className='border border-dark d-flex flex-wrap align-items-center' style={{height: '100%'}}>
                    <i className="remove-file fas fa-trash-alt" onClick={this.onRemove}></i>
                    <FilePreview file={this.props.file}/>
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