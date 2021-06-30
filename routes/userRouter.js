const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const requestManager = require("../request_manager/request");

router.post("/register", auth.isNotAuth, userCtrl.register);

router.post("/login", auth.isNotAuth, userCtrl.login);

router.post("/projectcreate", auth.isAuth, userCtrl.projectCreate);

router.get("/projectlist", auth.isAuth, userCtrl.projectList);

router.post("/projectlistsearch", auth.isAuth, userCtrl.projectListSearch);

router.post("/request", auth.isAuth, requestManager.requestHandler);

router.get("/logout", auth.isAuth, userCtrl.logout);

module.exports = router;
