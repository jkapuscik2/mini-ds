import React from "react"
import {Link, Redirect} from "react-router-dom";
import {HOME_URL} from "../../routes";
import {Error} from "../alerts";

class DeviceForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            uid: this.props.device ? this.props.device.uid : "",
            name: this.props.device ? this.props.device.name : "",
            description: this.props.device ? this.props.device.description : "",
            error: null,
            success: null
        }
    }

    createDevice = (name, description, userUid) => {
        return this.props.firebase.createDevice(
            name,
            description,
            userUid)
    }

    updateDevice = (name, description, uid, userUid) => {
        return this.props.firebase.updateDevice(
            name,
            description,
            uid,
            userUid)
    }

    getAction = () => {
        return (this.props.isNewRecord)
            ? this.createDevice(
                this.state.name,
                this.state.description,
                this.props.userUid
            )
            : this.updateDevice(
                this.state.name,
                this.state.description,
                this.state.uid,
                this.props.userUid
            )
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        this.setState({
            inProgress: true
        })

        this.getAction()
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
            <form className='col-12 col-xl-4' onSubmit={this.onFormSubmit}>
                <h4 className='text-center mb-4'>{this.props.isNewRecord ? "Add new device" : "Update device"}</h4>
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


export default DeviceForm