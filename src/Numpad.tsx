import {Button, Grid, GridProps, IconButton, styled, Typography} from "@mui/material";
import {FunctionComponent, useRef, useState} from "react";
import {StyledComponent} from "@emotion/styled";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Card from "./cardselector/CardsMock";
import { hashString } from "./useful";

interface NumpadProps {
	selectedCard: Card;
}

export const Numpad: FunctionComponent<NumpadProps> = (props) => {
	const {selectedCard} = props;
	const [text, setText] = useState("Entrez code :");
	const [codeDisplay, setCodeDisplay] = useState("\u00A0");

	const code = useRef("");

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


	// const handleButton = () => {
	// 		if(code.current.length < 6) {
	// 			code.current = code.current + i;
	// 			setCodeDisplay(codeDisplay + "*")
	// 		}
	// 	}

	const handleNumberButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		if(code.current.length < 6) {
			code.current = code.current + event.currentTarget.innerText;
			setCodeDisplay(codeDisplay + "*")
		}
	}

	const clearCode = () => {
		code.current = "";
		setCodeDisplay("\u00A0")
	}

	const handleClearButton = () => {
			clearCode();
		}

	const handleDoneButton = () => {
			if(hashString(code.current) === selectedCard.code_hash) {
				setText("Code correct");
				clearCode();
			} else {
				setText("Code incorrect");
				clearCode();
			}
		}

	return (
		<NumPad container>
			<NumpadElement item xs={12}>
				<Typography>{text}</Typography>
			</NumpadElement>
			<NumpadElement item xs={12}>
				<Typography>{codeDisplay}</Typography>
			</NumpadElement>

			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
				return (
					<NumpadElement key={"numpad"+i} item xs={4}>
						<Button variant={"contained"} onClick={handleNumberButton}>{i}</Button>
					</NumpadElement>
				);
			})}
			<NumpadElement key={"numpadClear"} item xs={4}>
				<IconButton color={"error"} onClick={handleClearButton}>
					<ClearIcon/>
				</IconButton>
			</NumpadElement>
			<NumpadElement key={"numpad0"} item xs={4}>
				<Button variant={"contained"} onClick={handleNumberButton}>0</Button>
			</NumpadElement>
			<NumpadElement key={"numpadDone"} item xs={4}>
				<IconButton color={"success"} onClick={handleDoneButton}>
					<DoneIcon/>
				</IconButton>
			</NumpadElement>
		</NumPad>
	);
};
