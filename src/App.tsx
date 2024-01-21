import React, { useState } from "react";
import { Numpad } from "./Numpad.tsx";
import "./App.css";
import { Divider } from "@mui/material";
import Card from "./cardselector/CardsMock.tsx";
import { CardSelector } from "./cardselector/CardSelector.tsx";
import cards  from "./cardselector/cards.json";
export const App: React.FunctionComponent = () => {
	const [selectedCard, setSelectedCard] = useState(
		cards[0] as Card
	);


  return (
    <>
      <CardSelector selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
	    <Divider orientation="vertical"/>
      <Numpad selectedCard={selectedCard}/>
    </>
  );
};
