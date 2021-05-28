import React from 'react'
import Card from "../components/card"
import '../assets/styles/explore.scss'

export default function ExplorePage() {
    return (
        <div className="backdrop">
            <div className="next-arrow">{"<"}</div>
            <Card />
            <div className="next-arrow">{">"}</div>
        </div>
    )
}
