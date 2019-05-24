import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {compose} from 'recompose';
import {DEVICES_URL, FILES_URL, HOME_URL, REGISTER_URL} from "./routes";
import Home from "./components/Home";
import Devices from "./components/Devices";
import Files from "./components/Files";
import LoginForm from "./components/signup/LoginForm";
import RegisterForm from "./components/signup/RegisterForm";

class App extends React.Component {

    render() {
        return (
            <>
                <Router>
                    <Route exact path={HOME_URL} component={this.props.loggedIn ? Home : LoginForm}/>
                    <Route path={DEVICES_URL} component={Devices}/>
                    <Route path={FILES_URL} component={Files}/>
                    <Route path={REGISTER_URL} component={RegisterForm}/>
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
