const express = require("express");
const router = express.Router();
const Controller = require("./user.controller");

router.post("/sign-up", Controller.createUsers);
router.post("/login", Controller.loginUser);
router.get("/get-user", Controller.getUsers)


module.exports = router;