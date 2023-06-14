const UserModel = require("../models/User")
const ListModel = require("../models/List")

module.exports = {
  getUsers: async (req, res) => {
    try {
      const tasks = await UserModel.find()
      res.json(tasks)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar tareas" })
    }
  },

  getUser: async (req, res) => {
    try {
      const task = await UserModel.findById(req.params.id).populate("tasks")
      if (!task) {
        console.log("Usuario no encontrado..")
        return res.status(404).json({ error: "Usuario no encontrado" })
      }
      console.log("Usuario encontrado...")
      res.json(task)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar el usuario" })
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = new UserModel(req.body)
      const savedUser = await newUser.save()
      console.log("Usuario Creado...")
      // Obtener la lista correspondiente y actualizar su propiedad tasks
      await ListModel.findByIdAndUpdate(req.body.list, {
        $push: { tasks: savedUser._id },
      })
      res.json(savedUser)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al crear el usuario" })
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, password, email, img, tasks } = req.body
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          name,
          password,
          email,
          img,
          tasks,
        },
        { new: true }
      )
      console.log("Usuario actualizado...")
      res.json(updatedUser)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al actualizar usuario" })
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
      await ListModel.findByIdAndUpdate(deletedUser.list, {
        $pull: { tasks: deletedUser._id },
      })
      console.log("Usuario eliminado...")
      res.json(deletedUser)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al eliminar usuario" })
    }
  },
}
