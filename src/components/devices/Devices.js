import React from "react"
import {compose} from "recompose";
import {Link} from "react-router-dom";
import {ADD_DEVICE_URL} from "../../routes";
import withLoggedInMenu from "../menu/withLoggedInMenu"
import {withFirebase} from "../firebase";
import {connect} from "react-redux";
import {fetchDevices} from "../../actions/devicesActions"
import DeviceRow from "./DeviceRow";
import Loader from "../Loader";
import {Error} from "../alerts";

class Devices extends React.Component {

    componentDidMount() {
        this.props.onFetchDevices(this.props.firebase)
    }

    render() {
        return (
            <div className="justify-content-center d-flex mt-5 mb-5">
                <div className=" card col-10 col-xl-6">
                    <div className="card-body table-responsive">
                        <h4 className='text-center mb-4'>Your devices</h4>

                        <table className="table table-hover text-center">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">API key</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {!this.props.inProgress
                                ? this.props.items.map((device, idx) => {
                                    return <DeviceRow device={device} idx={idx} key={device.uid}/>
                                })
                                : null}
                            </tbody>
                        </table>
                        {this.props.inProgress ?
                            <div className="text-center mt-5 mb-5">
                                <Loader size={'2rem'}/>
                            </div>
                            : ""
                        }

                        <Error error={this.props.error}/>
                        <Link to={ADD_DEVICE_URL}>
                            <button type="button" className="btn-standard button buttonBlue">
                                Add new device
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.devices.items,
        error: state.devices.error,
        inProgress: state.devices.inProgress
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        onFetchDevices: (fbInstance) =>
            dispatch(fetchDevices(fbInstance)),
    }
}
export default compose(
    withLoggedInMenu,
    withFirebase,
    connect(mapStateToProps, mapActionToDispatch)
)(Devices)