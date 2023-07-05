import React, {useEffect} from "react";
import Card from "./Card";

export default function Game({cards, shuffleCards, difficulty, setCards}){
    useEffect(()=>{
		shuffleCards();
        console.log(difficulty, cards)
        if (difficulty === 'easy'){
            setCards(cards.slice(0,3))
        } else if (difficulty === 'medium'){
            setCards(cards.slice(0,5))
        } else if (difficulty === 'hard'){
            setCards(cards.slice(0,7))
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