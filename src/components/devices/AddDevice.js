import React from 'react'
import DeviceForm from "./DeviceForm";
import withLoggedInMenu from "../menu/withLoggedInMenu";
import {compose} from "recompose";
import {connect} from "react-redux";

class AddDevice extends React.Component {

    render() {
        return (
            <DeviceForm
                isNewRecord={true}
                userUid={this.props.userUid}
                firebase={this.props.firebase}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userUid: state.user.auth.uid
    }
}
export default compose(
    withLoggedInMenu,
    connect(mapStateToProps)
)(AddDevice)
