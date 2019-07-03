import React from "react"
import PropTypes from "prop-types"

const ImgPreview = ({file}) => {
    return (
        <img src={file.url} alt="" className="img-fluid"/>
    )
}

ImgPreview.propTypes = {
    file: PropTypes.shape({
        url: PropTypes.string.isRequired
    }).isRequired
}

export default ImgPreview