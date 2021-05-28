import React from 'react';
import '../assets/styles/card.scss';

export default function Card({ portrait }){
    return (
        <div className="card-container">
            <img src="/api/portraits/image/594d85b03fc2681f6c68de98a12b8c92.jpeg" alt="" />
            <section className="card-bottom">
                <h3 className="title">
                    Title
                </h3>
                <h4 className="artist">
                    Artist
                </h4>
                <p className="description">
                    Description: lorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor sit amet, consectetur adiplorem ipsum dolor sit amet, consectetur adip
                </p>
                <p className="fun-fact">
                    Fun fact: lorem ipsum dolor sit amet, consectetur adip
                </p>
                <sub> 
                    Last edited:
                </sub>
            </section>
        </div>
    )
}