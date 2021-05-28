import React, { useState, useEffect } from 'react';
import PortraitForm from "../components/upload_form";
import { useParams } from 'react-router-dom';
import '../assets/styles/upload.scss';
import axios from "axios";

export default function UploadPage({ updatePortrait }) {
    const [prevData, setPrevData] = useState(false)
    const { portraitId } = useParams();
    const getPortrait = (portraitId) => {
        axios.get(`/api/portraits/${portraitId}`).then(portrait => setPrevData(portrait.data));
    }
    useEffect(() => {
        getPortrait(portraitId);
    }, [])
    
    return (
        <div className="backdrop">
            {
                prevData ? <PortraitForm savePortrait={updatePortrait} prevData={prevData} formType="update" /> : <div> Loading ... </div>
            }
        </div>
    )
}
