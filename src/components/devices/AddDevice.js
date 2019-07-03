import React from 'react'
import DeviceForm from "./DeviceForm";
import withLoggedInMenu from "../menu/withLoggedInMenu";
import {compose} from "recompose";
import PropTypes from "prop-types"

class AddDevice extends React.Component {

    render() {
        return (
            <DeviceForm
                isNewRecord={true}
                firebase={this.props.firebase}
            />
        )
    }
}

AddDevice.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default compose(
    withLoggedInMenu
)(AddDevice)
