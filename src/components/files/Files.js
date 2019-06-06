import React from "react"
import withLoggedInMenu from "../menu/withLoggedInMenu"
import Loader from "../Loader";
import {compose} from "recompose";
import {withFirebase} from "../firebase";
import {connect} from "react-redux";
import {addFile, resetFile} from "../../actions/fileActions";
import ProgressBar from "../ProgressBar";
import {Error, Success} from "../alerts";
import FilesList from "./FilesList";

class Files extends React.Component {

    setFileRef = (file) => {
        this.file = file;
    }

    setFormRef = (form) => {
        this.form = form;
    }

    addFile = (e) => {
        e.preventDefault()

        this.props.addFile(this.file.files[0], this.props.firebase)
        this.form.reset()
    }

    componentWillUnmount() {
        this.props.resetFile()
    }

    render() {
        return (
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className="card col-10 col-xl-6">
                    <div className="card-body">
                        <h4 className='text-center mb-4'>Your files</h4>

                        <form className='col-12' ref={this.setFormRef} onSubmit={this.addFile}>
                            <div className="form-group">
                                <label htmlFor="file">Add new file</label>
                                <input type="file"
                                       ref={this.setFileRef}
                                       className="form-control-file"
                                       id="file"
                                       required={true}></input>
                            </div>
                            {this.props.inProgress
                                ? <ProgressBar progress={this.props.progress}/>
                                : ""
                            }
                            <button type="submit" className="btn-standard button buttonBlue"
                                    disabled={this.props.inProgress}>
                                {this.props.inProgress
                                    ? <Loader/>
                                    : "Upload"}
                            </button>

                            {this.props.error
                                ? <Error error={this.props.error}/>
                                : ""
                            }
                            {this.props.success
                                ? <Success success={this.props.success}/>
                                : ""
                            }
                        </form>

                        <FilesList/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inProgress: state.file.inProgress,
        progress: state.file.progress,
        error: state.file.error,
        success: state.file.success
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        addFile: (file, fbInstance) => dispatch(addFile(file, fbInstance)),
        resetFile: () => dispatch(resetFile())
    }
}

export default compose(
    withLoggedInMenu,
    withFirebase,
    connect(mapStateToProps, mapActionToDispatch)
)(Files)