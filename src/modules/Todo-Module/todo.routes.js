const express = require("express");
const router = express.Router();
const Controller = require("./todo.controller");

router.post("/create", Controller.createTask);
router.get("/getlist", Controller.getTodoList);
router.put("/update-task/:id", Controller.updateTask);
router.delete("/delete-task/:id", Controller.deleteTask);
router.patch("/bulk-status-update", Controller.bulkStatusUpdate);
router.delete("/bulk-delete", Controller.bulkDelete);

module.exports = router; 