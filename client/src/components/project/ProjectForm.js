import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useEffect } from "react";
import FillMessage from "../utils/FillMessage";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const [title, settitle] = useState("");
	const [detail, setdetail] = useState("");
	const [deadline, setdeadline] = useState("");
	const [members, setmembers] = useState("");
	const [click, setclick] = useState(false);
	const [render, setrender] = useState(false);
	const [msgRender, setmsgRender] = useState(false);
	const [length, setlength] = useState(false);
	const [error, seterror] = useState(false);
	const [feedback, setfeedback] = useState("processing...");

	const logIn = useSelector((state) => state.signInReducer);

	const callProjectCreateAPI = async () => {
		try {
			const projectCreateInfo = { title, detail, deadline, members };

			const { data } = await axios.post(
				"http://localhost:5000/user/projectcreate",
				projectCreateInfo,
				{ withCredentials: true }
			);

			seterror(false);
			setfeedback(data.msg);
			settitle("");
			setdetail("");
			setdeadline("");
			setmembers("");
		} catch (err) {
			seterror(true);
		}
	};

	useEffect(() => {
		if (click) {
			if (title.length && detail && members && deadline) {
				setlength(true);
				callProjectCreateAPI();
			} else {
				setlength(false);
				setmsgRender(!msgRender);
			}
		}
	}, [click, render]);

	return (
		<>
			{logIn === "true" || localStorage.getItem("login") === "true" ? (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Create New Project
						</Typography>
						<form className={classes.form} validate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="project title"
								autoFocus
								onChange={(e) => {
									settitle(e.target.value);
								}}
								value={title}
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="detail"
								onChange={(e) => {
									setdetail(e.target.value);
								}}
								value={detail}
							/>
							<p>Deadline *</p>
							<TextField
								fullWidth
								type="date"
								onChange={(e) => {
									setdeadline(e.target.value);
								}}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Members"
								helperText="Input Member's email & separate members by comma(,)"
								onChange={(e) => {
									setmembers(e.target.value);
								}}
								value={members}
							/>

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
								Submit
							</Button>
						</form>
					</div>
				</Container>
			) : (
				<Redirect to="/signin" />
			)}
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
