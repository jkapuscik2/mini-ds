import React from 'react'
import {compose} from 'recompose'
import DeviceForm from "./DeviceForm";
import {fetchDevice, resetDevice} from "../../actions/deviceActions";
import withLoggedInMenu from "../menu/withLoggedInMenu";
import {connect} from "react-redux";

class UpdateDevice extends React.Component {

    componentWillMount() {
        this.props.onFetchDevice(
            this.props.match.params.uid,
            this.props.userUid,
            this.props.firebase)
    }


    render() {
        return (
            (this.props.inProgress)
                ? <div className="text-center mt-5 mb-5">
                    <div className="spinner-border" role="status"></div>
                </div>
                : <DeviceForm
                    userUid={this.props.userUid}
                    isNewRecord={false}
                    firebase={this.props.firebase}
                    device={this.props.device}/>
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
    connect(mapStateToProps, mapActionToDispatch)
)(UpdateDevice)