import React from "react"
import {compose} from "recompose";
import {Link} from "react-router-dom";
import withLoggedInMenu from "../menu/withLoggedInMenu"
import {withFirebase} from "../firebase";
import {connect} from "react-redux";
import {fetchDevice, resetDevice} from "../../actions/deviceActions"
import {Error} from "../alerts";
import {HOME_URL, UPDATE_DEVICE_URL} from "../../routes";

class Device extends React.Component {

    componentWillMount() {
        this.props.onFetchDevice(
            this.props.match.params.uid,
            this.props.userUid,
            this.props.firebase)
    }

    componentWillUnmount() {
        this.props.resetDevice()
    }

    render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="card col-10 col-xl-6">
                    <div className="card-body">
                        <h4 className='text-center mb-4'>Manage your device</h4>

                        {this.props.inProgress ?
                            <div className="text-center mt-5 mb-5">
                                <div className="spinner-border" role="status"></div>
                            </div>
                            : this.props.device ?
                                <div>
                                    <h5 className="card-title">Name: {this.props.device.name}</h5>
                                    <p className="card-text">{this.props.device.description}</p>
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
        error: state.device.error,
        userUid: state.user.auth.uid
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        onFetchDevice: (deviceUid, userUid, fbInstance) =>
            dispatch(fetchDevice(deviceUid, userUid, fbInstance)),
        resetDevice: () => dispatch(resetDevice())
    }
}

export default compose(
    withLoggedInMenu,
    withFirebase,
    connect(mapStateToProps, mapActionToDispatch)
)(Device)