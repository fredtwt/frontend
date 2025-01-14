import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC } from "../configs"
import {
	STATUS_CODE_CREATED,
	FIREBASE_EMAIL_EXISTS,
	FIREBASE_INVALID_EMAIL
} from "../constants"

function SignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogTitle, setDialogTitle] = useState("");
	const [dialogMsg, setDialogMsg] = useState("");
	const [isSignupSuccess, setIsSignupSuccess] = useState(false);

	const handleSignup = async () => {
		setIsSignupSuccess(false)
		const res = await axios.post(URL_USER_SVC + '/signup', { email, password })
			.catch((err) => {
				let output
				let errorCode = err.response.data.code
				switch (errorCode) {
					case FIREBASE_EMAIL_EXISTS:
						output = "Email is already in use, please use a different one."
						break;
					case FIREBASE_INVALID_EMAIL:
						output = "Email is of an invalid format"
						break;
					default:
						output = "Please try again later"
				}
				console.log(err.response.data.code)
				setErrorDialog(output)
			})
		if (res && res.status === STATUS_CODE_CREATED) {
			setSuccessDialog(res.data.message)
			setIsSignupSuccess(true)
		}
	}

	const closeDialog = () => setIsDialogOpen(false);

	const setSuccessDialog = (msg) => {
		setIsDialogOpen(true);
		setDialogTitle("Success");
		setDialogMsg(msg);
	};

	const setErrorDialog = (msg) => {
		setIsDialogOpen(true);
		setDialogTitle("Error");
		setDialogMsg(msg);
	};

	return (
		<Box display={"flex"} flexDirection={"column"} width={"30%"}>
			<Typography variant={"h3"} marginBottom={"2rem"}>
				Sign Up
			</Typography>
			<TextField
				label="Email"
				variant="standard"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				sx={{ marginBottom: "1rem" }}
				autoFocus
			/>
			<TextField
				label="Password"
				variant="standard"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				sx={{ marginBottom: "2rem" }}
			/>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
				<Button variant={"outlined"} onClick={handleSignup}>
					Sign up
				</Button>
			</Box>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
				<Button variant={"outlined"} component={Link} to="/login">
					Have an account?
				</Button>
			</Box>

			<Dialog open={isDialogOpen} onClose={closeDialog}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogMsg}</DialogContentText>
				</DialogContent>
				<DialogActions>
					{isSignupSuccess ? (
						<Button component={Link} to="/login">
							Log in
						</Button>
					) : (
						<Button onClick={closeDialog}>Done</Button>
					)}
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default SignupPage;
