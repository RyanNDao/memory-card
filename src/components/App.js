import '../App.css';
import { useState, createContext, useEffect } from 'react';
import Header from './Header'
import Game from './Game';
import { Homelander, Butcher, QueenMaeve, Hughie, Frenchie, Starlight, A_Train } from '../images/card-images.js';
import GameOverlay from './GameOverlay';

export const GameContext = createContext(null);

export default function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);  
	const [cards, setCards] = useState(cardsList);
	const [cardsClicked, setCardsClicked] = useState([]);
	const [gameOver, setGameOver] = useState(true);
	const [wrongCard, setWrongCard] = useState('');
	const [difficulty, setDifficulty] = useState('');

	useEffect(()=>{
		setCards(cardsList)
	},[difficulty])


	const handleCardClick = (e) => {
		let cardName = e.currentTarget.querySelector('.card-name').textContent
		if (cardsClicked.indexOf(cardName) === -1){
			setCardsClicked(cardsClicked.concat(cardName));
			setScore(score + 1);
			if (score + 1 > bestScore){
				setBestScore(score+1);
				
			}
			if (score+1 === cards.length){
				setGameOver(true);
			} else{
				shuffleCards();
			}
		} else {
			setGameOver(true)
			setWrongCard(cardName)
		}
	};

	const shuffleCards = () => {
		let deepCopy = cards.map((card)=>({...card}))
		for (let i = deepCopy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deepCopy[i], deepCopy[j]] = [deepCopy[j], deepCopy[i]];
		}
		setCards(deepCopy)
	}

	const startGame = () => {
		setScore(0);
		setDifficulty(document.querySelector('#difficulty').value);
		setCards(cardsList)
		setGameOver(false);
		setCardsClicked([]);
		setWrongCard('');
		shuffleCards();
	}

	return (
		<GameContext.Provider value={{handleCardClick}}>
		<div className="app-container">
			<Header score={score} bestScore={bestScore}/>
			{!gameOver && <Game cards={cards} shuffleCards={shuffleCards} difficulty={difficulty} setCards={setCards}/>}
			{gameOver && <GameOverlay startGame={startGame} bestScore={bestScore} cardsClicked={cardsClicked} cards={cards} wrongCard={wrongCard}/>}
		</div>
		
		</GameContext.Provider>
	);
}

const cardsList = [
	{
		name: 'Homelander',
		text: 'The most powerful hero in The Seven, albeit a little psychotic',
		src: Homelander
	},
	{
		name: 'Billy Butcher',
		text: 'The leader of The Boys and the antihero of the series',
		src: Butcher
	},
	{
		name: 'Queen Maeve',
		text: 'The nihilistic veteran of The Seven',
		src: QueenMaeve
	},
	{
		name: 'Hughie Campbell',
		text: 'The main character of the series who is on a mission for revenge',
		src: Hughie
	},
	{
		name: 'Frenchie',
		text: 'The hopeless romantic of The Boys, searching for his own purpose in another',
		src: Frenchie
	},
	{
		name: 'Starlight',
		text: 'The good-intentioned love interest of Hughie Campbell',
		src: Starlight
	},
	{
		name: 'A-Train',
		text: 'The self-serving speedy member of The Seven that kicked off the events of the series',
		src: A_Train
	},
]
