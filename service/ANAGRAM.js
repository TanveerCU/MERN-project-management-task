const Projects = require("../models/projectModel");
const Users = require("../models/userModel");

const anagram = {};

anagram.listOfAnagram = async (check, user) => {
	try {
		let dataList = [];

		if (check == "userList") {
			dataList = await Users.find({}).where("length").equals(user.length);

			return anagramCheck("userList", user, dataList);
		} else {
			dataList = await Projects.find({}).where("length").equals(user.length);

			return anagramCheck("projectList", user, dataList);
		}
	} catch (err) {
		return err;
	}
};

function anagramCheck(retrieveList, user, dataList) {
	let pushArr = [];

	let userArr = new Array(1000);
	for (let i = 0; i < 1000; ++i) {
		userArr[i] = 0;
	}

	if (dataList.length) {
		for (let i = 0; i < dataList.length; i++) {
			let discharge = true;
			let flag = true;

			//userArray initialize
			for (let j = 0; j < user.length; j++) {
				userArr[user.charCodeAt(j)] = userArr[user.charCodeAt(j)] + 1;
			}

			//check for ANAGRAM
			for (let k = 0; k < user.length; k++) {
				if (userArr[dataList[i].email.charCodeAt(k)] < 1) {
					flag = false;
					break;
				} else {
					userArr[dataList[i].email.charCodeAt(k)] =
						userArr[dataList[i].email.charCodeAt(k)] - 1;
				}
			}
			if (flag) {
				if (user != dataList[i].email) {
					if (retrieveList == "userList") {
						pushArr.push(dataList[i].email);
					} else {
						pushArr.push(dataList[i]._id);
					}
				}
				discharge = false;
			}

			//deinitialize userArray
			for (let j = 0; j < user.length; j++) {
				userArr[user.charCodeAt(j)] = 0;
			}
		}

		return pushArr;
	}
}

module.exports = anagram;
