import React from 'react'
import {connect} from "react-redux";
import {fetchFiles} from "../../actions/filesActions";
import {compose} from "recompose";
import {withFirebase} from "../firebase";
import Loader from "./FilesList";
import FilePreview from "./FilePreview";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class FilesCarusel extends React.Component {

    componentDidMount() {
        this.props.fetchFiles(this.props.firebase)
    }

    onChange = (fileIdx) => {
        this.props.onFileChange(this.props.files[fileIdx])
    }

    getFileIdx = () => {
        if (this.props.file) {
            for (let fileIdx in this.props.files) {
                if (this.props.files[fileIdx].uid === this.props.file.uid) {
                    return parseInt(fileIdx)
                }
            }
        }
        // Start with first one
        return 0
    }

    render() {
        return (
            <div className="justify-content-center d-flex mt-5 mb-5">
                <div className="col-12 text-center">
                    {this.props.inProgress
                        ?
                        <div className="text-center mt-5 mb-5">
                            <Loader size={"3rem"}/>
                        </div>
                        :

                        <Carousel dynamicHeight={true}
                                  showThumbs={false}
                                  showIndicators={false}
                                  autoPlay={false}
                                  onChange={this.onChange}
                                  selectedItem={this.getFileIdx()}
                                  width={'50%'}>
                            {this.props.files.map((file) => {
                                return (
                                    <FilePreview file={file} key={file.uid}/>
                                )
                            })}
                        </Carousel>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files.items,
        inProgress: state.files.inProgress,
        error: state.files.error
    }
}

const mapActionsToDispatch = (dispatch) => {
    return {
        fetchFiles: (fbInstance) => dispatch(fetchFiles(fbInstance))
    }
}

export default compose(
    connect(mapStateToProps, mapActionsToDispatch),
    withFirebase,
)(FilesCarusel)