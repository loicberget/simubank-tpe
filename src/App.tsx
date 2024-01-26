import React, {useEffect, useState} from "react";
import {Numpad} from "./simulation-page/Numpad.tsx";
import "./App.css";
import {Divider} from "@mui/material";
import Card from "./simulation-page/cardselector/CardsMock.tsx";
import {CardSelector} from "./simulation-page/cardselector/CardSelector.tsx";
import cards from "./simulation-page/cardselector/cards.json";


export const App: React.FunctionComponent = () => {
	const [selectedCard, setSelectedCard] = useState(
		cards[0] as Card
	);

	useEffect(() => {
		
	}, []);

	return (
		<>
			<CardSelector selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
			<Divider orientation="vertical"/>
			<Numpad selectedCard={selectedCard}/>
		</>
	);
};
