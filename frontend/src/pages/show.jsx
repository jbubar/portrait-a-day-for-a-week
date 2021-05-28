import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/show.scss';
import { FaTrash } from 'react-icons/fa';
// import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default function Show() {
    const [ portrait, setPortrait ] = useState({})
    let { portraitId } = useParams();

    const getPortrait = (portraitId) => {
        axios.get(`/api/portraits/${portraitId}`).then(portrait => setPortrait(portrait.data))
    }
    const deletePortrait = (portraitId) => {
        axios.get(`/api/portraits/delete/${portraitId}`).then(msg => {
            console.log(msg.data)
            if(msg.data.success) {
                history.push('/')
            }
        })
    }
    const formatDate = (dateStr) => {
        let date = new Date(dateStr);
        return date.toString().split(' ').slice(1, 4).join(' ');
    }

    useEffect(()=>{
        getPortrait(portraitId)
    })

    return (
        <div className="show-page-inner">
            <img src={`/api/portraits/image/${portrait?.imgName}`} alt="" />
            <div className="card-container">
                <section className="card-bottom">
                    <h3 className="title">
                        {portrait?.title}
                    </h3>
                    <h4 className="artist">
                        {portrait?.artist}
                    </h4>
                    <p className="description">
                        {portrait?.description}
                    </p>
                    <p className="fun-fact">
                        {portrait?.funFact}
                    </p>
                    <sub> 
                        Last edited: {formatDate(portrait?.updatedAt)}
                    </sub>
                    <div className="delete-btn" onClick={() => deletePortrait(portrait?._id)}>
                        <FaTrash /> Delete this portrait permanantly
                    </div>
                </section>
            </div>
        </div>
    )
}