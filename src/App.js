import {
    DEVICE_URL,
    FILES_URL,
    HOME_URL,
    REGISTER_URL,
    PASSWORD_RECOVERY_URL,
    CHANGE_PASSWORD_URL,
    ADD_DEVICE_URL,
    UPDATE_DEVICE_URL
} from "./routes";
import './App.css';
import React from 'react';
import {compose} from 'recompose'
import {connect} from "react-redux"
import NotFound from "./components/NoFound";
import Files from "./components/files/Files";
import Device from "./components/devices/Device";
import Devices from "./components/devices/Devices";
import {withFirebase} from "./components/firebase";
import LoginForm from "./components/signin/LoginForm";
import AddDevice from "./components/devices/AddDevice";
import RegisterForm from "./components/signup/RegisterForm";
import UpdateDevice from "./components/devices/UpdateDevice";
import PasswordRecovery from "./components/signin/PasswordRecovery";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import changePasswordForm from "./components/changePassword/changePasswordForm";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={HOME_URL} component={this.props.user ? Devices : LoginForm}/>
                    <Route exact path={`${DEVICE_URL}:uid`} component={Device}/>
                    <Route exact path={`${UPDATE_DEVICE_URL}:uid`} component={UpdateDevice}/>
                    <Route exact path={ADD_DEVICE_URL} component={AddDevice}/>
                    <Route exact path={FILES_URL} component={Files}/>
                    <Route exact path={CHANGE_PASSWORD_URL} component={changePasswordForm}/>
                    <Route exact path={REGISTER_URL} component={RegisterForm}/>
                    <Route exact path={PASSWORD_RECOVERY_URL} component={PasswordRecovery}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.auth
    }
}

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(App);
