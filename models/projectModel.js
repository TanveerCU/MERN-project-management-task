const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		title: { type: String },
		detail: { type: String },
		deadline: { type: String },
		email: { type: String },
		length: { type: Number },
		members: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("projects", projectSchema);
