import React from "react"
import withLoggedInMenu from "../menu/withLoggedInMenu"
import {Error, Success} from "../alerts"
import {connect} from "react-redux";
import {compose} from "recompose"
import PropTypes from "prop-types"

const INITIAL_STATE = {
    "currentPassword": "",
    "password": "",
    "passwordRepeat": "",
    "error": null,
    "success": null
}

const ERROR_MSGS = {
    "SAME_PASSWORDS": "Passwords do not match"
}

const SUCCESS_MSGS = {
    "CHANGE_SUCCESS": "Password was changed"
}

class ChangePasswordForm extends React.Component {

    state = {
        ...INITIAL_STATE
    }

    reautenticate = async () => {
        return await this.props.firebase.reautenticate(this.props.email, this.state.currentPassword)
            .then(() => {
                return true;
            })
            .catch((error) => {
                this.setState({
                    error: error.message
                })
                return false;
            })
    }

    checkData = async () => {
        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({
                "error": ERROR_MSGS["SAME_PASSWORDS"]
            })
            return false;
        }

        if (await this.reautenticate()) {
            this.setState({
                "error": null
            })
            return true;
        } else {
            return false;
        }
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    onPasswordChange = (e) => {
        e.preventDefault()

        this.checkData().then((result) => {
            if (result) {
                this.props.firebase.changePassword(this.state.password)
                    .then(() => {
                        this.setState({
                            ...INITIAL_STATE,
                            success: SUCCESS_MSGS["CHANGE_SUCCESS"]
                        })
                    })
                    .catch((error) => {
                        this.setState({
                            error: error.message
                        })
                    })
            }
        })

    }

    render() {
        return (
            <form className='col-12 col-xl-4' onSubmit={this.onPasswordChange}>
                <h4 className='text-center mb-4'>Change password</h4>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.currentPassword ? "used" : ""}
                           name='currentPassword'
                           id='currentPassword'
                           type="password"
                           required={true}
                           value={this.state.currentPassword}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Current password</label>
                </div>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.password ? "used" : ""}
                           name='password'
                           id='password'
                           type="password"
                           required={true}
                           value={this.state.password}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.passwordRepeat ? "used" : ""}
                           name='passwordRepeat'
                           id='passwordRepeat'
                           type="password"
                           required={true}
                           value={this.state.passwordRepeat}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Repeat password</label>
                </div>

                <button type="submit" className="button buttonBlue">
                    Submit
                </button>

                <Error error={this.state.error}/>
                <Success success={this.state.success}/>

            </form>
        )
    }
}

ChangePasswordForm.propTypes = {
    email: PropTypes.string,
    firebase: PropTypes.shape({
        changePassword: PropTypes.func.isRequired
    })
}

const mapStateToProps = (state) => {
    return {
        "email": state.user.auth.email
    }
}

export default compose(
    withLoggedInMenu,
    connect(mapStateToProps)
)(ChangePasswordForm)