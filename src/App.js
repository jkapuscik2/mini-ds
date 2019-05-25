import './App.css';
import React from 'react';
import {compose} from 'recompose'
import {connect} from "react-redux"
import Home from "./components/Home";
import Files from "./components/Files";
import Devices from "./components/Devices";
import LoginForm from "./components/signin/LoginForm";
import RegisterForm from "./components/signup/RegisterForm";
import PasswordRecovery from "./components/signin/PasswordRecovery";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import changePasswordForm from "./components/changePassword/changePasswordForm";
import {DEVICES_URL, FILES_URL, HOME_URL, REGISTER_URL, PASSWORD_RECOVERY_URL, CHANGE_PASSWORD_URL} from "./routes";

class App extends React.Component {

    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route exact path={HOME_URL} component={this.props.loggedIn ? Home : LoginForm}/>
                        <Route path={DEVICES_URL} component={Devices}/>
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
        loggedIn: state.user.auth
    }
}

export default compose(
    connect(mapStateToProps)
)(App);
