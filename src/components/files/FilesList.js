import React from "react"
import {connect} from "react-redux";
import Loader from "../Loader";
import {fetchFiles} from "../../actions/filesActions";
import {compose} from "recompose"
import {withFirebase} from "../firebase";
import FileItem from "./FileItem";

class FilesList extends React.Component {

    componentDidMount() {
        this.props.fetchFiles(this.props.userUid, this.props.firebase)
    }

    render() {
        return (
            <>
                {this.props.inProgress
                    ?
                    <div className="text-center mt-5 mb-5">
                        <Loader size={"3rem"}/>
                    </div>
                    :
                    <div className='row'>
                        {this.props.items.map((item) => (
                            <FileItem file={item} key={item.uid}/>
                        ))}
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.files.items,
        inProgress: state.files.inProgress,
        error: state.files.error,
        userUid: state.user.auth.uid
    }
}

const mapActionsToDispatch = (dispatch) => {
    return {
        fetchFiles: (userUid, fbInstance) => dispatch(fetchFiles(userUid, fbInstance))
    }
}

export default compose(
    connect(mapStateToProps, mapActionsToDispatch),
    withFirebase,
)(FilesList)