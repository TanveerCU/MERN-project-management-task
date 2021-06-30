const auth = {
	isAuth: (req, res, next) => {
		if (req.user) {
			return next();
		} else {
			res.send("Need to logIn");
		}
	},
	isNotAuth: (req, res, next) => {
		if (req.user) {
			return res.send("already Authorized");
		}
		next();
	},
};

module.exports = auth;
