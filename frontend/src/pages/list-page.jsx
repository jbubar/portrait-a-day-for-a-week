import React from 'react'
import Card from '../components/card'

export default function ListPage({ portraits }) {
    return (
        <div className="all-cards">
            { portraits.map(portrait => (
                <Card portrait={portrait} />
            ))}
        </div>
    )
}
