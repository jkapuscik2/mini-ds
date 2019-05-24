import React from "react"
import withLoggedInMenu from "./menu/withLoggedInMenu"

class Devices extends React.Component {

    render() {
        return (
            <h1 className='text-center'>Devices</h1>
        )
    }
}

export default withLoggedInMenu(Devices)