import React from "react"
import {PASSWORD_RECOVERY_URL, REGISTER_URL} from "../../routes";
import {Link} from "react-router-dom";
import withAuthentication from "../auth/withAuthentication";
import Error from "../alerts/Error"

const INITIAL_STATE = {
    "email": "",
    "password": "",
    "error": null
}

class LoginForm extends React.Component {

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

    onLogin = (e) => {
        e.preventDefault()
        this.props.firebase.loginEmail(this.state.email, this.state.password)
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

    render() {
        return (
            <>
                <nav className="navbar navbar-expand navbar-light bg-light">
                    <div className='text-center col-12'>
                        <img className='img img-responsive col-xl-2 col-4 img-center' alt='Logo' src='/logo.png'/>
                    </div>
                </nav>
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

                    <Error error={this.state.error}/>

                    <div>
                        <Link to={REGISTER_URL}>Register</Link>
                    </div>
                    <div>
                        <Link to={PASSWORD_RECOVERY_URL}>Password recovery</Link>
                    </div>
                </form>
            </>
        )
    }
}

export default withAuthentication(LoginForm)