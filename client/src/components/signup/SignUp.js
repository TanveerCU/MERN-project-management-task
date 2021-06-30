import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FillMessage from "../utils/FillMessage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "../utils/Loading";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();

	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [click, setclick] = useState(false);
	const [render, setrender] = useState(false);
	const [msgRender, setmsgRender] = useState(false);
	const [feedback, setfeedback] = useState("processing...");

	const [length, setlength] = useState(false);

	const callSignUpAPI = async () => {
		try {
			const name = firstName + " " + lastName;
			const signUpInfo = { name, email, password };

			const { data } = await axios.post(
				"http://localhost:5000/user/register",
				signUpInfo
			);
			setfeedback(data.msg);
			setfirstName("");
			setlastName("");
			setpassword("");
			setemail("");
		} catch (err) {
			setfeedback("something wrong");
		}
	};

	useEffect(() => {
		if (click) {
			if (
				firstName.length &&
				lastName.length &&
				password.length &&
				email.length
			) {
				setlength(true);
				callSignUpAPI();
				setmsgRender(!msgRender);
			} else {
				setlength(false);
				setmsgRender(!msgRender);
			}
		}
	}, [click, render]);

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="First Name"
									autoFocus
									value={firstName}
									onChange={(e) => {
										setfirstName(e.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Last Name"
									value={lastName}
									onChange={(e) => {
										setlastName(e.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Email Address"
									value={email}
									onChange={(e) => {
										setemail(e.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Password"
									type="password"
									value={password}
									onChange={(e) => {
										setpassword(e.target.value);
									}}
								/>
							</Grid>
						</Grid>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => {
								setclick(true);
								setrender(!render);
							}}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to={"/signin"}>
									<p className="text-blue-900 hover:underline">
										Already have an account? Sign in
									</p>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>

			{click && length ? (
				<FillMessage clicked={click} rendered={msgRender} msg={feedback} />
			) : (
				""
			)}
			{click && !length ? (
				<FillMessage
					clicked={click}
					rendered={msgRender}
					msg={"All Field Required"}
				/>
			) : (
				""
			)}
		</>
	);
}
