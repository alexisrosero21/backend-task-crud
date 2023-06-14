const TaskModel = require("../models/Task")
const ListModel = require("../models/List")

module.exports = {
  getTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.find()
      res.json(tasks)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar tareas" })
    }
  },

  getTask: async (req, res) => {
    try {
      const task = await TaskModel.findById(req.params.id).populate("list")
      if (!task) {
        console.log("Tarea no encontrada...")
        return res.status(404).json({ error: "Tarea no encontrada" })
      }
      console.log("Tarea encontrada...")
      res.json(task)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar tarea" })
    }
  },

  createTask: async (req, res) => {
    try {
      const newTask = new TaskModel(req.body)
      const savedTask = await newTask.save()
      console.log("Tarea guardada...")
      // Obtener la lista correspondiente y actualizar su propiedad tasks
      await ListModel.findByIdAndUpdate(req.body.list, {
        $push: { tasks: savedTask._id },
      })
      res.json(savedTask)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al crear tarea" })
    }
  },

  updateTask: async (req, res) => {
    try {
      const { title, description, status, date, time, list, user } = req.body
      const updatedTask = await TaskModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          status,
          date,
          time,
          list,
          user, // Agregar la propiedad list para actualizar la relación de lista
        },
        { new: true }
      )
      console.log("Tarea actualizada...")
      res.json(updatedTask)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al actualizar tarea" })
    }
  },

  deleteTask: async (req, res) => {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(req.params.id)
      //actualiza el usuario correspondiente y elimina la tarea de su propiedad tasks
      await ListModel.findByIdAndUpdate(deletedTask.list, {
        $pull: { tasks: deletedTask._id },
      })
      console.log("Tarea eliminada...")
      res.json(deletedTask)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al eliminar tarea" })
    }
  },
}
