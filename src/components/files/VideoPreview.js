import React from "react"

const VideoPreview = ({file}) => {
    return (
        <video controls={true} src={file.url} alt="" className="img-fluid"/>
    )
}

export default VideoPreview