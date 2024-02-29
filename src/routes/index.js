const express = require("express");
const router = express.Router();

const userRoute = require("../modules/User-Module/user.routes");
const todoRoute = require("../modules/Todo-Module/todo.routes");


router.use("/user", userRoute);
router.use("/todo", todoRoute);


module.exports = router;