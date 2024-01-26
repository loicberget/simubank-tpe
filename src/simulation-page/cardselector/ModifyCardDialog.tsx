import {useEffect, useRef, useState} from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	SxProps,
	TextField,
	Theme,
	styled
} from '@mui/material';
import Card from './CardsMock.ts';
import {regexName, regexCardNumber, hashString, regexCardCode} from '../../useful.ts';

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	card: Card;
};
export const ModifyCardDialog = (props: Props) => {

	const DialogPaperStyle: SxProps<Theme> = {
		padding: "2rem"
	}

	const DialogTextField = styled(TextField)(
		{
			marginBottom: "1rem",
			width: "30rem"
		}
	);

	const {open, setOpen} = props;

	let lastName: string = props.card.lastName;
	const [lastNameError, setLastNameError] = useState("");

	let firstName: string = props.card.firstName;
	const [firstNameError, setFirstNameError] = useState("");

	let cardNumber: string = props.card.number;
	const [cardNumberError, setCardNumberError] = useState("");

	let code: string = "";
	const [codeError, setCodeError] = useState("");

	let error: boolean = false;

	const handleClose = () => {
		lastName = props.card.lastName;
		setLastNameError("");
		firstName = props.card.firstName;
		setFirstNameError("");
		cardNumber = props.card.number;
		setCardNumberError("");
		code = "";
		setCodeError("");

		error = false;

		setOpen(false);
	};

	const checkError = () => {
		if (!regexName.test(lastName)) {
			error = true;
			setLastNameError("Caractères interdits ; entre 3 et 20 lettres attendues (- et ' autorisés)");
		} else {
			setLastNameError("");
		}
		if (!regexName.test(firstName)) {
			error = true;
			setFirstNameError("Caractères interdits ; entre 3 et 20 lettres attendues (- et ' autorisés)");
		} else {
			setFirstNameError("");
		}
		if (!regexCardNumber.test(cardNumber)) {
			error = true;
			setCardNumberError("Numéro invalide ; 16 chiffres attendus")
		} else {
			setCardNumberError("");
		}
		if (!regexCardCode.test(code) && code !== "") {
			error = true;
			setCodeError("Code invalide ; 4 à 6 chiffres attendus")
		} else {
			setCodeError("");
		}
	}

	const handleSubmit = () => {
		checkError();
		if (!error) {
			props.card.lastName = lastName;
			props.card.firstName = firstName;
			props.card.number = cardNumber;
			if (code != "") {
				props.card.hashedCode = hashString(code);
			}
			handleClose();
		}
	};

	const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		lastName = event.target.value;
	};

	const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		firstName = event.target.value;
	};

	const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		cardNumber = event.target.value;
	};

	const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		code = event.target.value;
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: DialogPaperStyle
			}}
		>
			<DialogTitle>Modifier la carte</DialogTitle>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.lastName}
				required
				error={lastNameError !== ""}
				helperText={lastNameError}
				onChange={handleChangeLastName}
			/>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.firstName}
				required
				error={firstNameError !== ""}
				helperText={firstNameError}
				onChange={handleChangeFirstName}
			/>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.number}
				required
				error={cardNumberError !== ""}
				helperText={cardNumberError}
				onChange={handleChangeNumber}
			/>
			<DialogTextField
				variant="outlined"
				placeholder={"Code"}
				type={"password"}
				error={codeError !== ""}
				helperText={codeError}
				onChange={handleChangeCode}
			/>

			<DialogActions>
				<Button variant={"contained"} color={"secondary"} onClick={handleClose}>Annuler</Button>
				<Button variant={"contained"} color={"primary"} onClick={handleSubmit}>Confirmer</Button>
			</DialogActions>
		</Dialog>
	);
};