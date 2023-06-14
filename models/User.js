const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    default: "https://picsum.photos/200",
  },

  //agrega un campo de tipo arreglo de objetos de tipo Task
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
})

module.exports = mongoose.model("User", UserSchema)
