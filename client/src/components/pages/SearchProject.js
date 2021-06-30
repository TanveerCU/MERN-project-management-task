import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import TableUtils from "../utils/TableUtils";
import { useSearchProjectList } from "../../data/projectListDataRetrieve";
const BootstrapInput = withStyles((theme) => ({
	root: {
		"label + &": {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 16,
		padding: "10px 26px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	iconAreaSize: {
		height: "2.5rem",
		width: "2.5rem",
		display: "flex",
		alignItems: "center",
	},
	iconSize: {
		height: "2.5rem",
		width: "2.5rem",
	},
}));

export default function CustomizedSelects() {
	const classes = useStyles();
	const [searchType, setsearchType] = useState("creation date");
	const [from, setfrom] = useState("");
	const [to, setto] = useState("");
	const [email, setemail] = useState("");
	const [title, settitle] = useState("");
	const [sendValue, setsendValue] = useState("");
	const [state, setstate] = useState(false);
	const [msg, setmsg] = useState("");

	const [toggle, settoggle] = useState(false);
	const [click, setclick] = useState(false);
	const data = useSearchProjectList(msg, state, sendValue, toggle, click);
	const [tableData, settableData] = useState({ rows: [], columns: [] });

	const handleChange = (event) => {
		setsearchType(event.target.value);
	};
	const clickHandle = () => {
		settableData({ rows: [], columns: [] });
		if (searchType === "creation date") {
			if (from.length && to.length) {
				const newDate = from + "," + to;
				setsendValue(newDate);
				setmsg(searchType);
				setstate(true);
				setclick(true);
				settoggle(!toggle);
			}
		} else if (searchType === "project owner") {
			if (email.length) {
				setsendValue(email);
				setmsg(searchType);
				setstate(true);
				setclick(true);
				settoggle(!toggle);
			}
		} else if (searchType === "project name") {
			if (title.length) {
				setsendValue(title);
				setmsg(searchType);
				setstate(true);
				setclick(true);
				settoggle(!toggle);
			}
		}
	};

	useEffect(() => {
		console.log(data);
		settableData(data);
	}, [data]);

	return (
		<>
			<div className="flex w-3/4 mx-auto mt-10 space-x-5 justify-center items-end">
				<FormControl>
					<InputLabel id="demo-customized-select-label">search Type</InputLabel>
					<Select
						value={searchType}
						onChange={handleChange}
						input={<BootstrapInput />}
					>
						<MenuItem value={"creation date"}>creation date</MenuItem>
						<MenuItem value={"project owner"}>Ownner email</MenuItem>
						<MenuItem value={"project name"}>project name</MenuItem>
					</Select>
				</FormControl>
				{searchType === "creation date" ? (
					<>
						<form className={classes.container} noValidate>
							<TextField
								id="date1"
								label="from"
								type="date"
								value={from}
								onChange={(e) => {
									setfrom(e.target.value);
								}}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="date2"
								label="To"
								type="date"
								value={to}
								onChange={(e) => {
									setto(e.target.value);
								}}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</form>
					</>
				) : (
					<>
						{searchType === "project owner" ? (
							<TextField
								id="outlined-basic"
								label="email"
								variant="outlined"
								value={email}
								onChange={(e) => {
									setemail(e.target.value);
								}}
							/>
						) : (
							<TextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								value={title}
								onChange={(e) => {
									settitle(e.target.value);
								}}
							/>
						)}
					</>
				)}
				<IconButton
					color="primary"
					aria-label="upload picture"
					className={classes.iconAreaSize}
					onClick={clickHandle}
				>
					<SearchRoundedIcon className={classes.iconSize} />
				</IconButton>
			</div>
			<div className="mt-16  flex flex-col items-center justify-center  mx-auto">
				<TableUtils data={tableData} text="Project List" />
			</div>
		</>
	);
}
