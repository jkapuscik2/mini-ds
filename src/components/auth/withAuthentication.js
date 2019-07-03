import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withFirebase} from "../firebase"
import {authUser} from "../../actions/userActions"
import PropTypes from 'prop-types';

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

    WithAuthentication.propTypes = {
        firebase: PropTypes.shape({
            authUserListener: PropTypes.func.isRequired
        }).isRequired,
        setAuthUser: PropTypes.func.isRequired
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
