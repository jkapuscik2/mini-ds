import React from 'react'
import DeviceForm from "./DeviceForm";
import withLoggedInMenu from "../menu/withLoggedInMenu";
import {compose} from "recompose";

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

export default compose(
    withLoggedInMenu
)(AddDevice)
