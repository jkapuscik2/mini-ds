import React from 'react'
import {compose} from 'recompose'
import DeviceForm from "./DeviceForm";
import {fetchDevice} from "../../actions/deviceActions";
import withLoggedInMenu from "../menu/withLoggedInMenu";
import {connect} from "react-redux";
import PropTypes from "prop-types"

class UpdateDevice extends React.Component {

    componentWillMount() {
        this.props.onFetchDevice(
            this.props.match.params.uid,
            this.props.firebase)
    }

    render() {
        return (
            (this.props.inProgress)
                ? <div className="text-center mt-5 mb-5">
                    <div className="spinner-border" role="status"></div>
                </div>
                : <DeviceForm
                    isNewRecord={false}
                    firebase={this.props.firebase}
                    device={this.props.device}/>
        )
    }
}

UpdateDevice.propTypes = {
    inProgress: PropTypes.bool,
    device: PropTypes.object,
    error: PropTypes.bool,
    onFetchDevice: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            uid: PropTypes.string.isRequired
        })
    })
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
            dispatch(fetchDevice(deviceUid, fbInstance))
    }
}

export default compose(
    withLoggedInMenu,
    connect(mapStateToProps, mapActionToDispatch)
)(UpdateDevice)