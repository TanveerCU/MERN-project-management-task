const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	Users.findById(id, (err, user) => {
		if (err) {
			done(null, false, { error: err });
		} else {
			done(null, user);
		}
	});
});

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				const user = await Users.findOne({ email });

				if (!user) {
					return done(null, false);
				}
				bcrypt.compare(password, user.password, function (err, result) {
					if (err) {
						throw err;
					}
					if (result) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
			} catch (err) {
				return done(null, false);
			}
		}
	)
);

module.exports = passport;
