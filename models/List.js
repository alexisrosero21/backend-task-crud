const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: "https://picsum.photos/200",
  },

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
})

module.exports = mongoose.model("List", ListSchema)
