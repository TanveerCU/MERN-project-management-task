const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name!"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please enter your email!"],
			trim: true,
			unique: true,
		},
		length: { type: Number },
		password: {
			type: String,
			required: [true, "Please enter your password!"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users", userSchema);
