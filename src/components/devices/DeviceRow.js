import React from "react"
import {Link} from "react-router-dom";
import {DEVICE_URL} from "../../routes";

const MAX_CONTENT_SIZE = 15

const DeviceRow = ({device, idx}) => {
    const displayLimited = (content) => (
        content.length > MAX_CONTENT_SIZE ?
            `${content.slice(0, MAX_CONTENT_SIZE)}...`
            : content
    )

    return (
        <tr>
            <th scope="row">{idx + 1}</th>
            <td>{displayLimited(device.name)}</td>
            <td>{displayLimited(device.description)}</td>
            <td>{device.uid}</td>
            <td>
                <i className="fas fa-pen-alt mr-2"></i>
                <Link to={`${DEVICE_URL}${device.uid}`}>
                    <i className="fas fa-eye"></i>
                </Link>
            </td>
        </tr>
    )
}

export default DeviceRow