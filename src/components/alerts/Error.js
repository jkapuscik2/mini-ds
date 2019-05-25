import React from 'react';

const Error = ({error}) => (
    (error) ?
        <div className="alert alert-danger text-center" role="alert">
            {error}
        </div>
        : ""
);

export default Error