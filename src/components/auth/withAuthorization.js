import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withFirebase} from '../firebase';
import {HOME_URL} from "../../routes";
import LoginForm from "../signin/LoginForm";
import PropTypes from 'prop-types';

const withAuthorization = Component => {

    class WithAuthorization extends React.Component {

        componentWillMount() {
            this.listener = this.props.firebase.authUserListener(
                () => {
                },
                () => {
                    this.props.history.push(HOME_URL);
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (this.props.authUser) ? (
                <Component {...this.props} />
            ) : <LoginForm/>;
        }
    }

    WithAuthorization.propTypes = {
        authUser: PropTypes.object,
        firebase: PropTypes.shape({
            authUserListener: PropTypes.func.isRequired
        }).isRequired
    }

    const mapStateToProps = state => ({
        authUser: state.user.auth
    });

    return compose(
        withFirebase,
        connect(mapStateToProps),
    )(WithAuthorization);
};

export default withAuthorization;
