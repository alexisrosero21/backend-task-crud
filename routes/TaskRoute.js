const { Router } = require("express")
const { get } = require("mongoose")
const router = Router()

const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController")

router.get("/get", getTasks)
router.get("/get/:id", getTask)
router.post("/create", createTask)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)

module.exports = router
