import React from "react"
import {REGISTER_URL} from "../../routes";
import {Link} from "react-router-dom";
import withAuthentication from "../auth/withAuthentication";

class LoginForm extends React.Component {

    state = {
        "email": "",
        "password": "",
        "error": null
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    onLogin = (e) => {
        e.preventDefault()
        this.props.firebase.loginEmail(this.state.email, this.state.password)
            .catch(error => {
                this.setState({error: error.message}
                );
            });
    }

    render() {
        return (
            <form className='col-12 col-xl-4' onSubmit={this.onLogin}>
                <h4 className='text-center'>Login</h4>
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
                <button type="submit" className="button buttonBlue">
                    Login
                </button>

                <div className={this.state.error ? "alert alert-danger text-center" : "d-none"} role="alert">
                    {this.state.error}
                </div>

                <Link to={REGISTER_URL}>Register</Link>
            </form>
        )
    }
}

export default withAuthentication(LoginForm)