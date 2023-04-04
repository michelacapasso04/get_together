const express = require("express");
const router = express.Router();

const session = require("./session");
const user = require("./user");
const recipes = require("./recipes");
const parties = require("./parties");
const friends = require("./friends");
const nots = require("./notifications");

const redirectToLogin = require("./session").redirectLogin;

router.use("/", session);
router.use("/user", redirectToLogin, user);
router.use("/recipes", redirectToLogin, recipes);
router.use("/parties", redirectToLogin, parties);
router.use("/friends", redirectToLogin, friends);
router.use("/notifications", redirectToLogin,nots);

module.exports = router;
