import React, { useContext } from "react";
import { GameContext } from "./App";

export default function Card({card}){
    const { handleCardClick } = useContext(GameContext)
    return (
        <div className="card" onClick={handleCardClick}>
            <span className="card-name">{card.name}</span>
            <img className="card-image" src={card.src} alt={card.name}></img>
            <span className="flavor-text">{card.text}</span>
        </div>
    )
}