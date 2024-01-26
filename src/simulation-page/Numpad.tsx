import {Button, Grid, GridProps, IconButton, Paper, styled, SxProps, Theme, Typography} from "@mui/material";
import {FunctionComponent, useRef, useState} from "react";
import {StyledComponent} from "@emotion/styled";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Card from "./cardselector/CardsMock.ts";
import {hashString, regexPrice} from "../useful.ts";

interface NumpadProps {
	selectedCard: Card;
}

enum NumpadMode {
	PRICE,
	CODE,
	CARD
}

export const Numpad: FunctionComponent<NumpadProps> = (props) => {
	const {selectedCard} = props;

	const code = useRef("");
	const price = useRef(0);
	const mode = useRef(NumpadMode.PRICE);

	const [message, setMessage] = useState("Entrez prix :");
	const [inputDisplay, setInputDisplay] = useState(price.current.toFixed(2) + "€");
	const [inputBackgroundColor, setInputBackgroundColor] = useState("");

	const containerStyle: SxProps<Theme> = {
		padding: "1rem",
	};

	const paperDisplayStyle: SxProps<Theme> = {
		backgroundColor: inputBackgroundColor,
		fontSize: "2rem",
		padding: "0.5rem",
		display: "flex",
		justifyContent: "center",
		width: "100%",
	};

	const NumPad: StyledComponent<GridProps> = styled(Grid)(
		{
			width: "20rem"
		}
	);

	const NumpadElement: StyledComponent<GridProps> = styled(Grid)(
		{
			display: "flex",
			justifyContent: "center",
			marginTop: "0.5rem",
		}
	);

	const handleNumberButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		switch (mode.current) {
			case NumpadMode.PRICE:
				price.current = price.current * 10 + (parseInt(event.currentTarget.innerText) / 100);
				setInputDisplay(price.current.toFixed(2) + "€");
				break;
			case NumpadMode.CODE:
				if (code.current.length < 6) {
					code.current = code.current + event.currentTarget.innerText;
					setInputDisplay(inputDisplay + "*")
				} else {
					setMessage("Code trop long ! Ré-essayez.");
					setInputBackgroundColor("error.main");
				}
				break;
			default:
				break;
		}
	}

	const resetPriceDisplay = () => {
		setInputDisplay("0.00€");
		setInputBackgroundColor("");
		setMessage("Entrez prix :");
	}

	const resetCodeDisplay = () => {
		setInputDisplay("");
		setInputBackgroundColor("");
		setMessage("Entrez code :");
	}

	const handleClearButton = () => {
		switch (mode.current) {
			case NumpadMode.PRICE:
				price.current = 0;
				resetPriceDisplay();
				break;
			case NumpadMode.CODE:
				code.current = "";
				resetCodeDisplay();
				break;
			default:
				break;
		}
	}

	const handleDoneButton = () => {
		switch (mode.current) {
			case NumpadMode.PRICE:
				if (regexPrice.test(price.current.toFixed(2))) {
					mode.current = NumpadMode.CARD;
					setMessage("Montant : " + inputDisplay + " - Insérez carte :");
					setInputDisplay("");
				} else {
					setMessage("Prix invalide, ré-essayez.");
					setInputBackgroundColor("error.main");
				}
				break;
			case NumpadMode.CODE:
				if (hashString(code.current) === selectedCard.hashedCode) {
					setMessage("Code correct");
					setInputBackgroundColor("success.main");
				} else {
					setMessage("Code incorrect. Ré-essayez.");
					setInputBackgroundColor("error.main");
				}
				break;
			default:
				break;
		}
	}

	const handleCardButton = () => {
		switch (mode.current) {
			case NumpadMode.CARD:
				setMessage("Entrez code :");
				mode.current = NumpadMode.CODE;
				break;
			case (NumpadMode.CODE):
				reinitialize();
				break;
			default:
				break;
		}
	}

	const reinitialize = () => {
		mode.current = NumpadMode.PRICE;
		code.current = "";
		price.current = 0;
		resetPriceDisplay();
	}

	const generateButton = (i: string) => {
		switch (i) {
			case "C":
				return (
					<NumpadElement key={"numpadClear"} item xs={4}>
						<IconButton
							disabled={mode.current !== NumpadMode.CODE && mode.current !== NumpadMode.PRICE}
							color={"error"}
							onClick={handleClearButton}>
							<ClearIcon/>
						</IconButton>
					</NumpadElement>
				);
			case "V":
				return (
					<NumpadElement key={"numpadDone"} item xs={4}>
						<IconButton
							disabled={mode.current !== NumpadMode.CODE && mode.current !== NumpadMode.PRICE}
							color={"success"}
							onClick={handleDoneButton}>
							<DoneIcon/>
						</IconButton>
					</NumpadElement>
				);
			case "I":
				return (
					<NumpadElement key={"card"} item xs={12}>
						<Button
							color={"secondary"}
							disabled={mode.current !== NumpadMode.CARD && mode.current !== NumpadMode.CODE}
							variant={"contained"}
							onClick={handleCardButton}>
							{
								mode.current === NumpadMode.CODE
									? "Sortir carte"
									: "Insérer carte"
							}
						</Button>
					</NumpadElement>
				);
			default:
				return (
					<NumpadElement key={"numpad" + i} item xs={4}>
						<Button
							disabled={mode.current !== NumpadMode.PRICE && mode.current !== NumpadMode.CODE}
							variant={"contained"}
							onClick={handleNumberButton}>
							{i}
						</Button>
					</NumpadElement>
				);
		}
	}

	const buttons = () => {
		const buttonsList: string[] = [
			"1", "2", "3",
			"4", "5", "6",
			"7", "8", "9",
			"C", "0", "V",
			"I"];
		return buttonsList.map(generateButton);
	}

	return (
		<Paper sx={containerStyle}>
			<NumPad container>
				<NumpadElement item xs={12}>
					<Typography>{message}</Typography>
				</NumpadElement>
				<NumpadElement item xs={12}>
					<Paper sx={paperDisplayStyle}>
						<Typography>{"\u00A0" + inputDisplay}</Typography>
					</Paper>
				</NumpadElement>
				{buttons()}
			</NumPad>
		</Paper>
	);
};
