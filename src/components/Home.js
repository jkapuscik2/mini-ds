import React from "react"
import withLoggedInMenu from "./menu/withLoggedInMenu"

class Home extends React.Component {

    render() {
        return (
            <h1 className='text-center'>HOME</h1>
        )
    }
}

export default withLoggedInMenu(Home)