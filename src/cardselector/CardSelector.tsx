import {useEffect, useState} from "react";

import {Box, IconButton, styled, Typography} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {positiveModulo} from "../useful";

import cards from "./cards.json";
import Card from "./CardsMock";
import { ModifyCardDialog } from "./ModifyCardDialog";

interface CardSelectorProps {
	selectedCard: Card;
	setSelectedCard: (card: Card) => void;
}

export const CardSelector = (props: CardSelectorProps) => {
	const {selectedCard, setSelectedCard} = props;
	const widthFocused: string = "320rem";
	const widthNotFocused: string = "100rem";

	const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);

	const boxStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	const CardLastName = styled(Typography)(
		{
			position: "absolute",
			bottom: "9.2rem",
			fontSize: "1.2rem",
			left: "11.4rem",
		}
	);

	const CardFirstName = styled(Typography)(
		{
			position: "absolute",
			bottom: "7.5rem",
			fontSize: "1.2rem",
			left: "11.4rem",
		}
	);

	const CardNumber = styled(Typography)(
		{
			position: "absolute",
			bottom: "4.2rem",
			fontSize: "1.2rem",
			left: "3.4rem",
		}
	);

	const cardList: Card[] = cards;
	useEffect(() => {
		setSelectedCard(cardList[0]);
	}, []);

	const handleClickCard = () => {
		setIsModifyDialogOpen(true)
	}

	const CardImages = cardList.map((card) => {
		return (
			<div
				key={card.id}
				style={{position: "relative"}}
				{...(card.id === selectedCard.id ? {onClick: handleClickCard} : {})}
			>
				<img
					src={"./src/assets/" + card.imgFileName + ".png"}
					alt="card"
					width={card.id === selectedCard.id ? widthFocused : widthNotFocused}
				/>
				{card.id === selectedCard.id ? <CardLastName>{card.lastName}</CardLastName> : null}
				{card.id === selectedCard.id ? <CardFirstName>{card.firstName}</CardFirstName> : null}
				{card.id === selectedCard.id ? <CardNumber>{card.number}</CardNumber> : null}
			</div>
		);
	})

	const handleButtonDown = () => {
		setSelectedCard(cardList[selectedCard.id + 1 % cardList.length]);
		for(let i = 0; i < 100; i++) {
		console.log(selectedCard.id);
		}
	}

	const handleButtonUp = () => {
		setSelectedCard(cardList[positiveModulo(selectedCard.id - 1, cardList.length)]);
	}

	return (
		<Box sx={boxStyle}>
			<Typography>Selectionner une carte</Typography>
			<IconButton onClick={handleButtonUp}>
				<KeyboardArrowUpIcon/>
			</IconButton>
			{CardImages}
			<IconButton onClick={handleButtonDown}>
				<KeyboardArrowDownIcon/>
			</IconButton>
			<ModifyCardDialog open={isModifyDialogOpen} setOpen={setIsModifyDialogOpen} card={selectedCard}/>
		</Box>
	);
};
