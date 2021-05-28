import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/show.scss';
import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export default function Show() {
    const [ portrait, setPortrait ] = useState({})
    const [deleted, setDeleted] = useState(false)
    let { portraitId } = useParams();

    const getPortrait = (portraitId) => {
        axios.get(`/api/portraits/${portraitId}`).then(portrait => setPortrait(portrait.data))
    }
    const deletePortrait = (portraitId) => {
        axios.get(`/api/portraits/delete/${portraitId}`).then(msg => {
            console.log(msg.data)
            if(msg.data.success) {
                setDeleted(true)
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
        <> { !deleted ? (
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
                        <Link to={`/update/${portraitId}`} className="update-btn">
                            <MdModeEdit /> Edit this portrait
                        </Link>
                        <div className="delete-btn" onClick={() => deletePortrait(portrait?._id)}>
                            <FaTrash /> Delete this portrait permanantly
                        </div>
                    </section>
                </div>
            </div>
        ) : <Redirect to='/' />
    }
    </>
    )
}
