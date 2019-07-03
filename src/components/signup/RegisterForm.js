import React from "react"
import {HOME_URL, PASSWORD_RECOVERY_URL} from "../../routes";
import {Link} from "react-router-dom";
import withAuthentication from "../auth/withAuthentication";
import Error from "../alerts/Error"
import PropTypes from "prop-types"

const ERROR_MSGS = {
    "SAME_PASSWORDS": "Passwords do not match"
}

const INITIAL_STATE = {
    "email": "",
    "password": "",
    "passwordRepeat": "",
    "error": ""
}

class RegisterForm extends React.Component {

    state = {
        ...INITIAL_STATE
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    onRegister = (e) => {
        e.preventDefault()

        if (this.checkData()) {
            this.props.firebase.registerEmail(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        ...INITIAL_STATE
                    })
                })
                .catch(error => {
                    this.setState({error: error.message}
                    );
                });
        }
    }

    checkData = () => {
        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({
                "error": ERROR_MSGS["SAME_PASSWORDS"]
            })
            return false;
        }

        this.setState({
            "error": null
        })
        return true;
    }

    render() {
        return (
            <form className='col-12 col-xl-4' onSubmit={this.onRegister}>
                <h4 className='text-center'>Register</h4>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.email ? "used" : ""}
                           name='email'
                           id='email'
                           type="email"/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email</label>
                </div>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.password ? "used" : ""}
                           name='password'
                           id='password'
                           type="password"/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Password</label>
                </div>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.passwordRepeat ? "used" : ""}
                           name='passwordRepeat'
                           id='passwordRepeat'
                           type="password"/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Repeat password</label>
                </div>

                <button type="submit" className="button buttonBlue">
                    Register
                </button>

                <Error error={this.state.error}/>

                <div>
                    <Link to={HOME_URL}>Login</Link>
                </div>
                <div>
                    <Link to={PASSWORD_RECOVERY_URL}>Password recovery</Link>
                </div>
            </form>
        )
    }
}

RegisterForm.propTypes = {
    firebase: PropTypes.shape({
        registerEmail: PropTypes.func.isRequired
    })
}

export default withAuthentication(RegisterForm)