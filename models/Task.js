const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
    default: "00:00",
  },

  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.model("Task", TaskSchema)
