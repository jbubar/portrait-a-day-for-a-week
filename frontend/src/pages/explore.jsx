import React from 'react'
import Card from "../components/card"
import '../assets/styles/explore.scss'

export default function ExplorePage({ portraits }) {
    return (
        <div className="backdrop">
            <div className="next-arrow">{"<"}</div>
            <Card portriat={portraits} />
            <div className="next-arrow">{">"}</div>
        </div>
    )
}
