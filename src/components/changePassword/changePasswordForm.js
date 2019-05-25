import React from "react"
import withLoggedInMenu from "../menu/withLoggedInMenu"

class changePasswordForm extends React.Component {

    render() {
        return (
            <h1 className='text-center'>Change password</h1>
        )
    }
}

export default withLoggedInMenu(changePasswordForm)