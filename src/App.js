import {
    DEVICES_URL,
    FILES_URL,
    HOME_URL,
    REGISTER_URL,
    PASSWORD_RECOVERY_URL,
    CHANGE_PASSWORD_URL,
    ADD_DEVICE_URL
} from "./routes";
import './App.css';
import React from 'react';
import {compose} from 'recompose'
import {connect} from "react-redux"
import Home from "./components/Home";
import Files from "./components/Files";
import Devices from "./components/devices/Devices";
import {withFirebase} from "./components/firebase";
import LoginForm from "./components/signin/LoginForm";
import RegisterForm from "./components/signup/RegisterForm";
import PasswordRecovery from "./components/signin/PasswordRecovery";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import changePasswordForm from "./components/changePassword/changePasswordForm";
import AddDeviceForm from "./components/devices/AddDeviceForm";

class App extends React.Component {

    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route exact path={HOME_URL} component={this.props.user ? Home : LoginForm}/>
                        <Route path={DEVICES_URL} component={Devices}/>
                        <Route path={ADD_DEVICE_URL} component={AddDeviceForm}/>
                        <Route path={FILES_URL} component={Files}/>
                        <Route path={CHANGE_PASSWORD_URL} component={changePasswordForm}/>
                        <Route path={REGISTER_URL} component={RegisterForm}/>
                        <Route path={PASSWORD_RECOVERY_URL} component={PasswordRecovery}/>
                    </Switch>
                </Router>
            </>
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
