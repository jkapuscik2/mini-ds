import React from "react"
import withLoggedInMenu from "./menu/withLoggedInMenu"

class Files extends React.Component {

    render() {
        return (
            <h1 className='text-center'>Files</h1>
        )
    }
}

export default withLoggedInMenu(Files)