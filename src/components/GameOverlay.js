import React from "react";

export default function GameOverlay({bestScore, startGame, cardsClicked, wrongCard}){
    return (
        <div className="overlay">
            <div className="game-end">
                {
                    bestScore === 0 && 
                    <div className="instructions-container">
                    <h1>Instructions:</h1>
                    <p>A quick fun game to test your memory! The game ends when you click on a card that was already clicked! Don't repeat cards!</p>
                    </div>
                }
                <ul>
                    {wrongCard || bestScore === 0 ? (bestScore === 0 ? null : "Game over! You clicked all these cards:") : "You won! You clicked on all of the cards:"}
                    {
                        cardsClicked.map((cardName)=>{
                            return <li className={cardName === wrongCard ? 'wrong-card' : ''} key={cardName}>{cardName}</li>
                        })
                    }
                </ul>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button className="start-game" onClick={startGame}>{bestScore === 0 ? "Start Game!" : "Play Again!"}</button>
                <p className="best-score">Best Score: {bestScore}</p>
            </div>
        </div>
    )
}