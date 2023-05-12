const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const Task = require("./routes/TaskRoute")
const List = require("./routes/ListRoute")

const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectada..."))
  .catch((err) => console.log(err))

app.use("/api/task", Task)
app.use("/api/list", List)

app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto", PORT)
})
