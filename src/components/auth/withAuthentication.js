import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withFirebase} from "../firebase"
import {authUser} from "../../actions/userActions"

const withAuthentication = Component => {

    class WithAuthentication extends React.Component {

        componentWillMount() {
            this.listener = this.props.firebase.authUserListener(
                authUser => {
                    this.props.setAuthUser(authUser);
                },
                () => {
                    this.props.setAuthUser(null);
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    const mapDispatchToProps = dispatch => ({
        setAuthUser: user =>
            dispatch(authUser(user)),
    });

    return compose(
        withFirebase,
        connect(
            null,
            mapDispatchToProps,
        ),
    )(WithAuthentication);
};

export default withAuthentication;
