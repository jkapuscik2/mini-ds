import React from "react"
import ImgPreview from "./ImgPreview";
import VideoPreview from "./VideoPreview";

const IMG_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
const VIDEO_TYPES = ['video/mp4', 'video/webm']

const FileItem = ({file}) => {
    if (IMG_TYPES.includes(file.type)) {
        return <ImgPreview file={file}/>
    } else if (VIDEO_TYPES.includes(file.type)) {
        return <VideoPreview file={file}/>
    } else {
        throw new Error("Unsupported file type encountered");
    }
}

export default FileItem