import React from "react"

const ImgPreview = ({file}) => {
    return (
        <img src={file.url} alt="" className="img-fluid"/>
    )
}

export default ImgPreview