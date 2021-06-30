import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/authAction";
import axios from "axios";

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "$ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}))(Badge);

function Header() {
	const loggedInLocalStorage = localStorage.getItem("login");
	const userName = localStorage.getItem("name");
	const loggedInReduxStorage = useSelector((state) => state.signInReducer);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logOut = async () => {
		try {
			const { data } = await axios.get("http://localhost:5000/user/logout", {
				withCredentials: true,
			});
			if (data) {
				localStorage.removeItem("login");
				localStorage.removeItem("name");
				setAnchorEl(null);
				dispatch(signIn(""));
			}
		} catch (err) {
			dispatch(signIn(true));
		}
	};

	return (
		<div className=" w-full px-5 py-3 shadow-lg text-blue-900 flex justify-between items-center sm:px-12">
			<div className="flex items-center space-x-3 sm:space-x-2">
				<span className="text-md font-semibold mt-1/4 sm:text-3xl">
					Project Management
				</span>
			</div>

			<div className="flex  items-center space-x-6 sm:space-x-16">
				{loggedInLocalStorage === "true" || loggedInReduxStorage === "true" ? (
					<>
						<div className="flex items-center space-x-5">
							<Link to="/create">
								<p className="text-blue-900 font-bold text-lg underline">
									{" "}
									Create Project
								</p>
							</Link>
							<Link to="/seeproject">
								<p className="text-blue-900 font-bold text-lg underline">
									see Projects
								</p>
							</Link>
							<Link to="/searchproject">
								<p className="text-blue-900 font-bold text-lg underline">
									search Project
								</p>
							</Link>
							<Link to="/seeuser">
								<p className="text-blue-900 font-bold text-lg underline">
									GuestAPI users
								</p>
							</Link>
							<div
								className="flex items-center space-x-2 cursor-pointer"
								onClick={handleClick}
							>
								<StyledBadge
									overlap="circle"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									variant="dot"
								>
									<i className="fas fa-user-circle text-lg sm:text-2xl"></i>
								</StyledBadge>
								<span className="font-bold sm:text-semibold">{userName}</span>
							</div>
						</div>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<Link to="/signin">
								<MenuItem onClick={logOut}>Logout</MenuItem>
							</Link>
						</Menu>
					</>
				) : (
					<Link to="/signin">
						<div className="flex items-center space-x-2">
							<i className="fas fa-sign-in-alt "></i>
							<span className="font-bold sm:text-semibold">SignIn</span>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}

export default Header;
