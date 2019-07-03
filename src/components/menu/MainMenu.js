import React from "react"
import {NavLink} from "react-router-dom";
import {CHANGE_PASSWORD_URL, FILES_URL, HOME_URL} from "../../routes";
import withAuthentication from "../auth/withAuthentication";
import PropTypes from 'prop-types';

class MainMenu extends React.Component {

    state = {
        accountDropdownVisible: false
    }

    onLogout = (e) => {
        e.preventDefault()
        this.props.firebase.logOut()
    }

    toggleDropdown = () => {
        this.setState({
            accountDropdownVisible: !this.state.accountDropdownVisible
        })
    }

    hideDropdown = (e) => {
        if (this.accountDropDown && !this.accountDropDown.contains(e.target)) {
            this.setState({
                accountDropdownVisible: false
            })
        }
    }

    setDropDownRef = (accountDropDown) => {
        this.accountDropDown = accountDropDown
    }

    componentDidMount() {
        document.addEventListener('click', this.hideDropdown)
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className='text-center col-12'>
                    <img className='img img-responsive col-xl-2 col-4 img-center' alt='Logo' src='/logo.png'/>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={HOME_URL} activeClassName="active">Devices</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={FILES_URL} activeClassName="active">Files</NavLink>
                        </li>
                        <li ref={this.setDropDownRef}
                            className={`nav-item dropdown ${(this.state.accountDropdownVisible) ? "show" : ""}`}>
                            <a className="nav-link dropdown-toggle"
                               href="#"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded={(this.state.accountDropdownVisible) ? true : false}
                               onClick={this.toggleDropdown}
                            >
                                Account
                            </a>
                            <div
                                className={`dropdown-menu dropdown-menu-right ${(this.state.accountDropdownVisible)
                                    ? "show"
                                    : ""}`}
                                aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to={CHANGE_PASSWORD_URL}>Change password</NavLink>
                                <div className="dropdown-divider"></div>
                                <a onClick={this.onLogout} className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

MainMenu.propTypes = {
    firebase: PropTypes.shape({
        logOut: PropTypes.func.isRequired
    }).isRequired
}

export default withAuthentication(MainMenu)