import React from "react"
import PropTypes from "prop-types"

const VideoPreview = ({file}) => {
    return (
        <video controls={true} src={file.url} alt="" className="img-fluid"/>
    )
}

VideoPreview.propTypes = {
    file: PropTypes.shape({
        url: PropTypes.string.isRequired
    }).isRequired
}

export default VideoPreview