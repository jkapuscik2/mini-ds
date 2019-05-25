import React from 'react';

const Success = ({success}) => (
    (success) ?
        <div className="alert alert-success text-center" role="alert">
            {success}
        </div>
        : ""
);

export default Success