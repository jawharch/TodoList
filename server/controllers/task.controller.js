const { Task } = require('../models/Task')

exports.createTask = async (req, res) => {
    const { task_name, priority } = req.body
    try {
      const newTask = await Task.create({ task_name, priority })
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } 
  exports.updateTask = async (req, res) => {
    const id = req.params.id
    const { task_name, priority } = req.body
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      const newTask=await task.update({ task_name, priority });
      res.status(200).json(newTask)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }   
  exports.deleteTask = async (req, res) => {
    const  id  = req.params.id
    try {
      const task = await Task.findByPk(id)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      await task.destroy();
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };