const { Router } = require("express")
const { get } = require("mongoose")
const router = Router()

const {
  getLists,
  createList,
  getList,
  updateList,
  deleteList,
} = require("../controllers/ListController")

router.get("/get", getLists)
router.get("/get/:id", getList)
router.post("/create", createList)
router.put("/update/:id", updateList)
router.delete("/delete/:id", deleteList)

module.exports = router
