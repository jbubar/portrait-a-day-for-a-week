import React from 'react'
import Card from '../components/card'

export default function ListPage({ portraits }) {
    return (
        <div className="all-cards">
            { portraits.map(portrait => (
                <Card key={portrait._id} portrait={portrait} />
            ))}
        </div>
    )
}
