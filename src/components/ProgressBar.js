import React from "react";
import PropTypes from "prop-types"

const ProgressBar = ({progress}) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated"
                 role="progressbar"
                 aria-valuenow={progress}
                 aria-valuemin="0"
                 aria-valuemax="100"
                 style={{width: `${progress}%`}}
            ></div>
        </div>
    )
}

PropTypes.propTypes = {
    progress: PropTypes.number.isRequired
}

export default ProgressBar