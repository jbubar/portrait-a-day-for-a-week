import React, { useState } from 'react'
import Card from "../components/card"
import '../assets/styles/explore.scss'

export default function ExplorePage({ portraits }) {
    const [index, setIndex] = useState(0);
    const shiftIndex = (direction) => {
        let stackLen = portraits.length;
        if (direction === "next"){ 
            setIndex((index + 1) % stackLen)
        } else if (direction === "previous") {
            let newIndex = index === 0 ? stackLen - 1 : (index - 1) % stackLen
            setIndex(newIndex)
        }
    }
    return (
        <div className="backdrop">
            <div className="next-arrow" onClick={()=>{shiftIndex("previous")}}>{"<"}</div>
            <Card portrait={portraits[index]} />
            <div className="next-arrow" onClick={()=>{shiftIndex("next")}}>{">"}</div>
        </div>
    )
}
