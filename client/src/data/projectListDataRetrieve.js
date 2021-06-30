import axios from "axios";
import { useEffect, useState } from "react";
const columns = [
	{
		field: "title",
		headerName: "Project Title",
		flex: 1,
	},
	{
		field: "email",
		headerName: "Project owner",
		flex: 1,
	},
	{
		field: "detail",
		headerName: "Project Detail",
		flex: 1,
	},
	{
		field: "members",
		headerName: "Project Members",
		flex: 1,
	},
	{
		field: "deadline",
		headerName: "Project Deadline",
		flex: 1,
	},
];

export const useProjectList = () => {
	const [row, setrow] = useState([]);

	const projectListAPI = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:5000/user/projectlist",
				{
					withCredentials: true,
				}
			);

			setrow(data);
		} catch (err) {
			setrow([]);
		}
	};

	const data = {
		rows: [...row],
		columns: [...columns],
	};

	useEffect(() => {
		projectListAPI();
	}, []);

	return data;
};

export const useSearchProjectList = (msg, state, sendValue, toggle, click) => {
	const [feedback, setfeedback] = useState({
		rows: [],
		columns: [...columns],
	});

	const body = { field1: "", field2: "" };

	let tabledata = {
		rows: [],
		columns: [...columns],
	};

	const projectListAPI = async () => {
		try {
			if (msg === "creation date") {
				body["field1"] = "createdAt";
				body["field2"] = sendValue;
				console.log(body);
				console.log("encounter Date");
			} else if (msg === "project owner") {
				body["field1"] = "email";
				body["field2"] = sendValue;
				console.log(body);
				console.log("encounter email");
			} else if (msg === "project name") {
				body["field1"] = "title";
				body["field2"] = sendValue;
				console.log(body);
				console.log("encounter title");
			}
			console.log(body);

			const { data } = await axios.post(
				"http://localhost:5000/user/projectlistsearch",
				body,
				{
					withCredentials: true,
				}
			);

			tabledata = {
				rows: [...data],
				columns: [...columns],
			};

			setfeedback(tabledata);
		} catch (err) {
			return feedback;
		}
	};

	useEffect(() => {
		if (click) {
			projectListAPI();
		}
	}, [click, toggle]);

	return feedback;
};

export function useDisplayUser() {
	const [userData, setuserData] = useState({});
	const userAPI = async () => {
		try {
			const { data } = await axios.get("https://api.github.com/users");
			setuserData(data);
			return userData;
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		userAPI();
	}, []);

	return userData;
}
