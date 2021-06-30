const Users = require("../models/userModel");
const Projects = require("../models/projectModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const anagram = require("../service/ANAGRAM");

const userCtrl = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;

			if (!name || !email || !password)
				return res.status(400).json({ msg: "Please fill in all fields." });

			if (!validateEmail(email))
				return res.status(400).json({ msg: "Invalid emails." });

			const check = await Users.findOne({ email });
			if (check)
				return res.status(400).json({ msg: "This email already exists." });
			const passwordHash = await bcrypt.hash(password, 10);

			const newUser = new Users({
				name,
				email,
				length: email.length,
				password: passwordHash,
			});

			await newUser.save();
			const mail = email;
			const anagramArrayList = await anagram.listOfAnagram("projectList", mail);

			if (typeof anagramArrayList != "undefined") {
				if (anagramArrayList.length) {
					await Projects.updateMany(
						{ _id: { $in: [...anagramArrayList] } },
						{ $push: { members: email } }
					);
				}
			}
			return res.status(201).json({ msg: "account has been created" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ msg: err.message });
		}
	},

	login: (req, res, next) => {
		passport.authenticate("local", (err, user, info) => {
			if (err) res.status(500).json({ msg: err.message });
			if (!user) res.status(400).json({ msg: "No User Exists" });
			else {
				req.logIn(user, (err) => {
					if (err) res.status(500).json({ msg: err.message });
					res.status(200).json({ msg: `${req.user.name}` });
				});
			}
		})(req, res, next);
	},

	projectCreate: async (req, res) => {
		try {
			const { title, detail, deadline, members } = req.body;

			if (title && detail && deadline && members) {
				const arr = members.split(",");
				let newArr = [];
				if (typeof arr !== "object") {
					newArr = [arr];
				} else {
					newArr = [...arr];
				}

				const mail = req.user.email;

				const anagramArrayList = await anagram.listOfAnagram("userList", mail);
				const projectData = {
					title,
					detail,
					deadline,
					email: req.user.email,
					length: req.user.email.length,
					members: [...newArr, ...anagramArrayList],
				};

				const newProject = new Projects(projectData);
				await newProject.save();
				return res.status(201).json({ msg: "project has been created" });
			} else {
				res.status(400).json({ msg: "Fill all the fields" });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	projectList: async (req, res) => {
		try {
			const data = await Projects.find({});

			if (data) {
				return res.status(200).json(data);
			} else {
				return res.status(400).json({ msg: "no data to display" });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	projectListSearch: async (req, res) => {
		try {
			let { field1, field2 } = req.body;
			if (field1 === "createdAt") {
				field2 = field2.split(",");
				const fromFullDate = field2[0].split("-");

				const toFullDate = field2[1].split("-");

				const from = new Date(field2[0]);
				const to = new Date(field2[1]);

				const data = await Projects.find({
					createdAt: {
						$gte: new Date(
							fromFullDate[0],
							Number(fromFullDate[1]) - 1,
							fromFullDate[2]
						),
						$lte: new Date(
							toFullDate[0],
							Number(toFullDate[1]) - 1,
							toFullDate[2],
							23,
							59,
							59
						),
					},
				});
				if (data.length) {
					return res.status(200).json(data);
				} else {
					return res.status(400).json({ msg: "no data to display" });
				}
			} else if (field1 === "email") {
				const data = await Projects.find({ email: field2 });

				if (data.length) {
					return res.status(200).json(data);
				} else {
					return res.status(400).json({ msg: "no data to display" });
				}
			} else if (field1 === "title") {
				const data = await Projects.find({ title: field2 });
				if (data) {
					return res.status(200).json(data);
				} else {
					return res.status(400).json({ msg: "no data to display" });
				}
			} else {
				return res.status(400).json({ msg: "no data to display" });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	logout: (req, res) => {
		req.logout();
		res
			.status(200)
			.clearCookie("connect.sid", {
				path: "/",
				secure: false,
				httpOnly: true,
				domain: "localhost",
				sameSite: true,
			})
			.end();
		req.session.destroy();
	},
};

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

module.exports = userCtrl;
