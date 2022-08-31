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
	FIREBASE_INVALID_EMAIL,
	FIREBASE_USER_NOT_FOUND,
	FIREBASE_WRONG_PASSWORD
} from "../constants"

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [dialogTitle, setDialogTitle] = useState("");
	const [dialogMsg, setDialogMsg] = useState("");
	const [isLoginSuccess, setIsLoginSuccess] = useState(false);

	const handleLogin = async () => {
		setIsLoginSuccess(false)
		const res = await axios.post(URL_USER_SVC + '/login', { email, password })
			.catch((err) => {
				let output
				let errorCode = err.response.data.code
				switch (errorCode) {
					case FIREBASE_USER_NOT_FOUND:
						output = "Email is not registered as a user!"
						break;
					case FIREBASE_WRONG_PASSWORD:
						output = "Password is incorrect!"
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
			setIsLoginSuccess(true)
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
				Login
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
				<Button variant={"outlined"} onClick={handleLogin}>
					Login
				</Button>
			</Box>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
				<Button variant={"outlined"} component={Link} to="/signup">
					Register new account
				</Button>
			</Box>

			<Dialog open={isDialogOpen} onClose={closeDialog}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogMsg}</DialogContentText>
				</DialogContent>
				<DialogActions>
					{isLoginSuccess ? (
						<Button onClick={closeDialog}>
							Done
						</Button>
					) : (
						<Button onClick={closeDialog}>Try again</Button>
					)}
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default LoginPage;
