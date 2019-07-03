import React from 'react';
import PropTypes from 'prop-types';

const Error = ({error}) => (
    (error) ?
        <div className="alert alert-danger text-center" role="alert">
            {error}
        </div>
        : ""
);

Error.propTypes = {
    error: PropTypes.string,
}

export default Error