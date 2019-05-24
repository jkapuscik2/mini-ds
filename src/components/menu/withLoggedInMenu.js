import React from "react";
import withAuthorization from "../auth/withAuthorization";
import MainMenu from "./MainMenu";

const withLoggedInMenu = Component => {

    class withLoggedInMenu extends React.Component {

        render() {
            return (
                <>
                    <MainMenu/>
                    <Component {...this.props} />
                </>
            );
        }
    }

    return withAuthorization(withLoggedInMenu)
}

export default withLoggedInMenu