import React from 'react'
import UploadForm from "../components/upload_form"
import '../assets/styles/upload.scss'

export default function UploadPage({ addPortrait }) {
    return (
        <div className="backdrop">
            <UploadForm savePortrait={addPortrait} formType="create" />
        </div>
    )
}
