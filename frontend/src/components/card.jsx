import React from 'react';

export default function Card(){
    return (
        <div className="card-container">
            <img src="/api/portraits/image/7d08f18685884dfc654f0eb625c83134.png" alt="" />
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