import React from "react"
import {compose} from "recompose";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {HOME_URL} from "../../routes";
import {Error} from "../alerts";
import withLoggedInMenu from "../menu/withLoggedInMenu"

const INITIAL_STATE = {
    name: "",
    description: "",
    error: null,
    success: null
}

class AddDeviceForm extends React.Component {

    state = {...INITIAL_STATE}

    onAddNewDevice = (e) => {
        e.preventDefault();

        this.setState({
            inProgress: true
        })

        this.props.firebase.createDevice(
            this.state.name,
            this.state.description,
            this.props.userUid)
            .then(() => {
                this.setState({
                    inProgress: false,
                    success: true
                })
            })
            .catch((error) => {
                this.setState({
                    inProgress: false,
                    error: error.message
                })
            })
    }

    handleChange = (e) => {
        const name = e.target.name;

        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    render() {
        return !this.state.success ? (
            <form className='col-12 col-xl-4' onSubmit={this.onAddNewDevice}>
                <h4 className='text-center mb-4'>Add new device</h4>
                <div className="group">
                    <input onChange={this.handleChange}
                           className={this.state.name ? "used" : ""}
                           name='name'
                           id='name'
                           type="text"
                           required={true}
                           value={this.state.name}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Device name</label>
                </div>
                <div className="group">
                    <label className='label-standard' htmlFor="description">Description</label>

                    <textarea
                        onChange={this.handleChange}
                        className='form-control used'
                        name='description'
                        id='description'
                        rows='5'
                        type="text"
                        value={this.state.description}
                    />
                </div>

                <button type="submit" className="button buttonBlue" disabled={this.state.inProgress}>
                    {this.state.inProgress
                        ?
                        <span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
                        : "Submit"}
                </button>

                <Error error={this.state.error}/>

                <Link to={HOME_URL}>
                    <button type="button" className="btn-standard button buttonBlue">
                        All devices
                    </button>
                </Link>
            </form>
        ) : <Redirect to={HOME_URL}/>
    }
}

const mapStateToProps = (state) => {
    return {
        userUid: state.user.auth.uid
    }
}

export default compose(
    withLoggedInMenu,
    connect(mapStateToProps)
)(AddDeviceForm)