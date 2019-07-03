import React from 'react';
import PropTypes from 'prop-types';

const Success = ({success}) => (
    (success) ?
        <div className="alert alert-success text-center" role="alert">
            {success}
        </div>
        : ""
);

Success.propTypes = {
    success: PropTypes.string
}

export default Success