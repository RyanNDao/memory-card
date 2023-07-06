import React, {useEffect} from "react";
import Card from "./Card";

export default function Game({cards, shuffleCards, difficulty, setCards}){
    useEffect(()=>{
		shuffleCards();
        console.log(difficulty, cards)
        if (difficulty === 'easy'){
            setCards(cards.slice(0,6))
        } else if (difficulty === 'medium'){
            setCards(cards.slice(0,9))
        } else if (difficulty === 'hard'){
            setCards(cards.slice(0,12))
        }
	},[])

    
    return (
        <div className="game-container">
            {
                cards.map((card)=>{
                    return <Card key={card.name} card={card}/>         
                })
            }
        </div>
    )
}