import {IMG_TYPES, VIDEO_TYPES} from "../../config/files";
import React from "react";
import VideoPreview from "./VideoPreview";
import ImgPreview from "./ImgPreview";
import PropTypes from "prop-types"

const FilePreview = ({file}) => {
    if (IMG_TYPES.includes(file.type)) {
        return <ImgPreview file={file}/>
    } else if (VIDEO_TYPES.includes(file.type)) {
        return <VideoPreview file={file}/>
    } else {
        throw new Error(`Wrong file type: ${file.type}`);
    }
}

FilePreview.propTypes = {
    file: PropTypes.shape({
        type: PropTypes.string.isRequired
    }).isRequired
}

export default FilePreview