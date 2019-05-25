import React from "react"
import {HOME_URL, REGISTER_URL} from "../../routes";
import {Link} from "react-router-dom";
import Error from "../alerts/Error"
import Success from "../alerts/Success"
import {withFirebase} from "../firebase"

const EMAIL_SUCCESS_MSG = "Email with instructions was sent"

class PasswordRecovery extends React.Component {

    state = {
        "email": "",
        "error": null,
        "emailSuccess": false
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    onRecovery = (e) => {
        e.preventDefault()
        this.props.firebase.recoverPassword(this.state.email)
            .then(() => {
                this.setState({
                    error: null,
                    emailSuccess: EMAIL_SUCCESS_MSG,
                    email: ""
                })
            })
            .catch(error => {
                this.setState({
                        error: error.message,
                        emailSuccess: false
                    }
                );
            });
    }

    render() {
        return (
            <form className='col-12 col-xl-4' onSubmit={this.onRecovery}>
                <h4 className='text-center'>Reset password</h4>
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

                <button type="submit" className="button buttonBlue">
                    Send
                </button>

                <Success success={this.state.emailSuccess}/>

                <Error error={this.state.error}/>

                <div>
                    <Link to={HOME_URL}>Login</Link>
                </div>
                <div>
                    <Link to={REGISTER_URL}>Register</Link>
                </div>
            </form>
        )
    }
}

export default withFirebase(PasswordRecovery)