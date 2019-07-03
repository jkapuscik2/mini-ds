import React from "react";
import PropTypes from "prop-types"

const Loader = ({size = "1rem"}) => (
        <span className='spinner-border spinner-border mr-3 ml-3'
              role="status"
              aria-hidden="true"
              style={{height: size, width: size}}
        ></span>
    )

Loader.propTypes = {
    size: PropTypes.string
}

export default Loader