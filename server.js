require("./db/dbConnect");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
const passport = require("./config/passport-config");

app.use(express.json());

var corsOptions = {
	origin: ["http://localhost:3000", "fe1.gotipath.com", "fe2.gotipath.com"],
	optionsSuccessStatus: 200, // For legacy browser support
	credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", require("./routes/userRouter"));

app.listen(5000, () => {
	console.log("server is running");
});
