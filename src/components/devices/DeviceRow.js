import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {DEVICE_URL, UPDATE_DEVICE_URL} from "../../routes";
import {removeDevice} from "../../actions/devicesActions";
import {compose} from "recompose";
import {withFirebase} from "../firebase";

const MAX_CONTENT_SIZE = 15

class DeviceRow extends React.Component {

    displayLimited = (content) => (
        content.length > MAX_CONTENT_SIZE ?
            `${content.slice(0, MAX_CONTENT_SIZE)}...`
            : content
    )

    handleRemove = (e) => {
        e.preventDefault()
        this.props.removeDevice(this.props.device, this.props.firebase)
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.idx + 1}</th>
                <td>{this.displayLimited(this.props.device.name)}</td>
                <td>{this.displayLimited(this.props.device.description)}</td>
                <td>{this.props.device.uid}</td>
                <td>
                    <Link to={`${UPDATE_DEVICE_URL}${this.props.device.uid}`}>
                        <i className="fas fa-pen-alt mr-2"></i>
                    </Link>
                    <Link to={`${DEVICE_URL}${this.props.device.uid}`}>
                        <i className="fas fa-eye mr-2"></i>
                    </Link>
                    <a href='#' onClick={this.handleRemove}>
                        <i className="fas fa-minus-circle"></i>
                    </a>
                </td>
            </tr>
        )
    }
}

const mapActionsToDispatch = (dispatch) => {
    return {
        removeDevice: (device, fbInstance) => dispatch(removeDevice(device, fbInstance))
    }
}

export default compose(
    connect(null, mapActionsToDispatch),
    withFirebase
)(DeviceRow)