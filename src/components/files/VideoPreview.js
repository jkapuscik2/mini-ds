import React from "react"

const VideoPreview = ({file}) => {
    return (
        <div className='col-3 mt-4 mb-4'>
            <div className='border border-dark d-flex flex-wrap align-items-center' style={{height: '100%'}}>
                <video controls={true} src={file.url} alt="" className="img-fluid"/>
            </div>
        </div>
    )
}

export default VideoPreview