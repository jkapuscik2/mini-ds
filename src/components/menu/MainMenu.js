import React from "react"
import {NavLink} from "react-router-dom";
import {DEVICES_URL, FILES_URL, HOME_URL} from "../../routes";
import withAuthentication from "../auth/withAuthentication";

class MainMenu extends React.Component {

    onLogout = (e) => {
        e.preventDefault()
        this.props.firebase.logOut()
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-light">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink exact={true} className="nav-link" to={HOME_URL} activeClassName="active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={DEVICES_URL} activeClassName="active">Devices</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={FILES_URL} activeClassName="active">Files</NavLink>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.onLogout} className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withAuthentication(MainMenu)