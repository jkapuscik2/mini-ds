import React from "react"
import {compose} from "recompose";
import {Link} from "react-router-dom";
import withLoggedInMenu from "../menu/withLoggedInMenu"
import {withFirebase} from "../firebase";
import {connect} from "react-redux";
import {fetchDevice, resetDevice} from "../../actions/deviceActions"
import {Error} from "../alerts";
import {HOME_URL, UPDATE_DEVICE_URL} from "../../routes";
import FilePreview from "../files/FilePreview";

class Device extends React.Component {

    componentWillMount() {
        this.props.onFetchDevice(
            this.props.match.params.uid,
            this.props.firebase)
    }

    componentWillUnmount() {
        this.props.resetDevice()
    }

    formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="card col-10 col-xl-6">
                    <div className="card-body">
                        <h4 className='text-center mb-4'>Your device</h4>

                        {this.props.inProgress ?
                            <div className="text-center mt-5 mb-5">
                                <div className="spinner-border" role="status"></div>
                            </div>
                            : this.props.device ?
                                <div>
                                    <h3 className="card-title card-header">Name: {this.props.device.name}</h3>

                                    <div className="card-body">
                                        <ul className="list-group ">
                                            <li className="list-group-item list-group-item-action">
                                                Create time: {this.formatDate(this.props.device.date_created.seconds)}
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Last update: {this.formatDate(this.props.device.last_update.seconds)}
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                API key: {this.props.device.uid}
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Description: {this.props.device.description}
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Device up to date: {this.props.device.is_updated ? "No" : "Yes"}
                                            </li>
                                            {this.props.device.file
                                                ?
                                                <li className="list-group-item list-group-item-action">
                                                    Added file:
                                                    <div className='col-12 col-xl-4 my-5'>
                                                        <FilePreview file={this.props.device.file}/>
                                                    </div>
                                                </li>
                                                : ""
                                            }
                                        </ul>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>

                    <Error error={this.props.error}/>

                    <div className="btn-group" role="group">
                        <Link to={HOME_URL} className='mr-2'>
                            <button type="button" className="btn-standard button buttonBlue">
                                All devices
                            </button>
                        </Link>
                        {(this.props.device) ?
                            <Link to={`${UPDATE_DEVICE_URL}${this.props.device.uid}`}>
                                <button type="button" className="btn-standard button buttonBlue">
                                    Update
                                </button>
                            </Link>
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inProgress: state.device.inProgress,
        device: state.device.data,
        error: state.device.error
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        onFetchDevice: (deviceUid, fbInstance) =>
            dispatch(fetchDevice(deviceUid, fbInstance)),
        resetDevice: () => dispatch(resetDevice())
    }
}

export default compose(
    withLoggedInMenu,
    withFirebase,
    connect(mapStateToProps, mapActionToDispatch)
)(Device)