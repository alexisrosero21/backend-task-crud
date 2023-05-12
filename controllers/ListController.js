const ListModel = require("../models/List")
const TaskModel = require("../models/Task")

module.exports = {
  getLists: async (req, res) => {
    try {
      const lists = await ListModel.find().populate("tasks")
      res.json(lists)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar listas" })
    }
  },

  getList: async (req, res) => {
    try {
      const list = await ListModel.findById(req.params.id).populate("tasks")
      if (!list) {
        console.log("Tarea no encontrada...")
        return res.status(404).json({ error: "Lista no encontrada" })
      }
      console.log("Lista encontrada...")
      res.json(list)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al buscar lista" })
    }
  },

  createList: async (req, res) => {
    try {
      const newList = new ListModel(req.body)
      const savedList = await newList.save()
      console.log("Lista guardada...")
      // Agregar la referencia de la lista en cada tarea que se relaciona con ella
      await TaskModel.updateMany({ _id: { $in: newList.tasks } }, { list: savedList._id })
      // Poblar las tareas de la lista para devolverlas en la respuesta
      const populatedList = await ListModel.findById(savedList._id).populate("tasks")
      res.json(populatedList)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al crear lista" })
    }
  },

  updateList: async (req, res) => {
    try {
      const { name, color } = req.body
      const updatedList = await ListModel.findByIdAndUpdate(
        req.params.id,
        {
          name,
          color,
        },
        { new: true }
      )
      console.log("Lista actualizada...")
      res.json(updatedList)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al actualizar lista" })
    }
  },

  deleteList: async (req, res) => {
    try {
      const deletedList = await ListModel.findByIdAndDelete(req.params.id)
      console.log("Lista eliminada...")
      res.json(deletedList)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error al eliminar lista" })
    }
  },
}
