import React from 'react'
import UploadForm from "../components/upload_form"
import '../assets/styles/upload.scss'

export default function UploadPage(props) {
    return (
        <div className="backdrop">
            {console.log(props)}
            <UploadForm />
        </div>
    )
}
