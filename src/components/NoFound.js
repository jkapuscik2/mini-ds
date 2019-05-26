import React from 'react'
import {Link} from "react-router-dom";
import {HOME_URL} from "../routes";

const NotFound = () => (
    <div className="row justify-content-center mt-5 pt-5">
        <div className="card col-10 col-xl-6">
            <div className="card-body">
                <h4 className='text-center mb-4'>Page not found</h4>
                <Link to={HOME_URL}>
                    <button type="button" className="button buttonBlue">
                        Go to homepage
                    </button>
                </Link>
            </div>
        </div>
    </div>
)

export default NotFound