import {useRef, useState} from 'react';
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
import Card from './CardsMock';
import {regexName, regexCardNumber} from '../useful';

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
			marginBottom: "1rem"
		}
	);

	const {open, setOpen} = props;

	const lastName = useRef(props.card.lastName);
	const [lastNameError, setLastNameError] = useState(false);
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

	const firstName = useRef(props.card.firstName);
	const [firstNameError, setFirstNameError] = useState(false);
	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

	const number = useRef(props.card.number);
	const [numberError, setNumberError] = useState(false);
	const [numberErrorMessage, setNumberErrorMessage] = useState("");

	const code = useRef("");
	const [codeError, setCodeError] = useState(false);
	const [codeErrorMessage, setCodeErrorMessage] = useState("");

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		if(!regexName.test(lastName.current)) {
			setLastNameError(true);
			setLastNameErrorMessage("Nom invalide");
		} else {
			setLastNameError(false);
			setLastNameErrorMessage("");
		}

		if(!regexName.test(firstName.current)) {
			setFirstNameError(true);
			setFirstNameErrorMessage("Prénom invalide");
		} else {
			setFirstNameError(false);
			setFirstNameErrorMessage("");
		}

		if(!regexCardNumber.test(number.current)) {
			setNumberError(true);
			setNumberErrorMessage("Numéro invalide");
		} else {
			setNumberError(false);
			setNumberErrorMessage("");
		}


		handleClose();
	};

	const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		lastName.current = event.target.value;
	};

	const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		firstName.current = event.target.value;
	};

	const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		number.current = event.target.value;
	};

	const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		code.current = event.target.value;
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: DialogPaperStyle,
				component: 'form',
				onSubmit: handleSubmit
			}}
		>
			<DialogTitle>Modifier la carte</DialogTitle>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.lastName}
				required
				error={lastNameError}
				helperText={lastNameErrorMessage}
				onChange={handleChangeLastName}
			/>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.firstName}
				required
				error={firstNameError}
				helperText={firstNameErrorMessage}
				onChange={handleChangeFirstName}
			/>
			<DialogTextField
				variant="outlined"
				defaultValue={props.card.number}
				required
				error={numberError}
				helperText={numberErrorMessage}
				onChange={handleChangeNumber}
			/>
			<DialogTextField
				variant="outlined"
				placeholder={"Code"}
				type={"password"}
				required
				error={codeError}
				helperText={codeErrorMessage}
				onChange={handleChangeCode}
			/>

			<DialogActions>
				<Button variant={"contained"} color={"secondary"} onClick={handleClose}>Annuler</Button>
				<Button variant={"contained"} color={"primary"} type="submit">Confirmer</Button>
			</DialogActions>
		</Dialog>
	);
};