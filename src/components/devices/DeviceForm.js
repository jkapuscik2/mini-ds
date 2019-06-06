import React from "react"
import {Link, Redirect} from "react-router-dom";
import {HOME_URL} from "../../routes";
import {Error} from "../alerts";
import Loader from "../Loader";
import FilesCarusel from "../files/FilesCarusel";

class DeviceForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            uid: this.props.device ? this.props.device.uid : null,
            name: this.props.device ? this.props.device.name : "",
            description: this.props.device ? this.props.device.description : "",
            file: this.props.device ? this.props.device.file : null,
            error: null,
            success: null
        }
    }

    createDevice = () => {
        return this.props.firebase.createDevice(
            this.state.name,
            this.state.description,
            this.state.file
        )
    }

    updateDevice = () => {
        return this.props.firebase.updateDevice(
            this.state.name,
            this.state.description,
            this.state.uid,
            this.state.file
        )
    }

    getAction = () => {
        return (this.props.isNewRecord)
            ? this.createDevice()
            : this.updateDevice()
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

    onFileChange = (file) => {
        this.setState({
            file: file
        })
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

                <h5 className='text-center'>Pick a file</h5>

                <FilesCarusel file={this.state.file} onFileChange={this.onFileChange}/>

                <button type="submit" className="button buttonBlue" disabled={this.state.inProgress}>
                    {this.state.inProgress
                        ? <Loader/>
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