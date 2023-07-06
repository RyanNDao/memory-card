import '../App.css';
import { useState, createContext, useEffect } from 'react';
import Header from './Header'
import Game from './Game';
import { Homelander, Butcher, QueenMaeve, Hughie, Frenchie, Starlight, A_Train, Kimiko, Deep, Black_Noir, Mothers_Milk, Stan_Edgar } from '../images/card-images.js';
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
	},[gameOver])


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
			{gameOver && <GameOverlay startGame={startGame} bestScore={bestScore} cardsClicked={cardsClicked} wrongCard={wrongCard}/>}
		</div>
		
		</GameContext.Provider>
	);
}

export const cardsList = [
	{
		name: 'Homelander',
		text: 'The captain of The Seven and the most powerful supe, albeit a little psychotic',
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
		text: 'The main character of the series who is on a mission of revenge',
		src: Hughie
	},
	{
		name: 'Frenchie',
		text: 'The hopeless romantic member of The Boys, searching for his own purpose in another',
		src: Frenchie
	},
	{
		name: 'Starlight',
		text: 'The good-intentioned love interest of Hughie Campbell and double-agent of The Seven ',
		src: Starlight
	},
	{
		name: 'A-Train',
		text: 'The self-serving speedster of The Seven that kicked off the events of the series',
		src: A_Train
	},
	{
		name: 'Kimiko Miyashiro',
		text: 'The kidnapped and mute fugitive who slowly learns that her strength does not come from her powers',
		src: Kimiko
	},
	{
		name: 'The Deep',
		text: 'Token fish guy',
		src: Deep
	},
	{
		name: 'Black Noir',
		text: 'The silent but deadly assassin of The Seven whose loyalty lies with Homelander',
		src: Black_Noir
	},
	{
		name: 'Mother\'s Milk',
		text: 'The moral compass who promised to exact revenge on the one who murdered his father',
		src: Mothers_Milk
	},
	{
		name: 'Stan Edgar',
		text: 'The executive of Vought with a frightening presence',
		src: Stan_Edgar
	}
]
