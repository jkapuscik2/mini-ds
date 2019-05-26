import React from "react"

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
        </tr>
    )
}

export default DeviceRow