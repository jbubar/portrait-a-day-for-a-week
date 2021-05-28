import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/card.scss';

export default function Card({ portrait }){
    const formatDate = (dateStr) => {
        let date = new Date(dateStr);
        return date.toString().split(' ').slice(1, 4).join(' ');
    }
    return (
        <Link to={`/portraits/${portrait?._id}`} className="card-container">
            <img src={`/api/portraits/image/${portrait?.imgName}`} alt="" />
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
            </section>
        </Link>
    )
}